import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
  console.error("Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters) for this one-time command.");
  process.exit(1);
}
const prisma = new PrismaClient();
try {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const admin = await prisma.admin.upsert({ where:{email:ADMIN_EMAIL.toLowerCase()}, update:{name:ADMIN_NAME,passwordHash}, create:{name:ADMIN_NAME,email:ADMIN_EMAIL.toLowerCase(),passwordHash} });
  console.log(`Admin ready: ${admin.email}`);
} finally { await prisma.$disconnect(); }
