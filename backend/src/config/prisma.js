import { PrismaClient } from "@prisma/client";
export const prisma = globalThis.__skinByYasPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.__skinByYasPrisma = prisma;
