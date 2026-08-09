import { prisma } from "../config/prisma.js";
import { ok } from "../utils/api.js";
export async function dashboard(_req,res){const [products,orders,reservations,articles]=await prisma.$transaction([prisma.product.count(),prisma.order.count(),prisma.reservation.count(),prisma.article.count()]);ok(res,{products,orders,reservations,articles});}
