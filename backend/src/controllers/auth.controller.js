import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import { AppError, ok } from "../utils/api.js";
export async function login(req,res){ const admin=await prisma.admin.findUnique({where:{email:req.body.email.toLowerCase()}}); if(!admin||!await bcrypt.compare(req.body.password,admin.passwordHash)) throw new AppError(401,"INVALID_CREDENTIALS","Identifiants invalides."); const token=jwt.sign({sub:admin.id,role:admin.role},env.JWT_SECRET,{expiresIn:env.JWT_EXPIRES_IN}); return ok(res,{token,admin:{id:admin.id,name:admin.name,email:admin.email,role:admin.role}}); }
