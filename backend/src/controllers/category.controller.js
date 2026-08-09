import { prisma } from "../config/prisma.js";
import { AppError,ok } from "../utils/api.js";
export async function listCategories(_req,res){ok(res,await prisma.category.findMany({where:{isActive:true},orderBy:{name:"asc"}}));}
export async function getCategory(req,res){const item=await prisma.category.findFirst({where:{slug:req.params.slug,isActive:true}});if(!item)throw new AppError(404,"CATEGORY_NOT_FOUND","Catégorie introuvable.");ok(res,item);}
export async function listAdminCategories(_req,res){ok(res,await prisma.category.findMany({include:{_count:{select:{products:true}}},orderBy:{name:"asc"}}));}
export async function createCategory(req,res){ok(res,await prisma.category.create({data:req.body}),201);}
export async function updateCategory(req,res){ok(res,await prisma.category.update({where:{id:req.params.id},data:req.body}));}
export async function deleteCategory(req,res){if(await prisma.product.count({where:{categoryId:req.params.id}}))throw new AppError(409,"CATEGORY_IN_USE","Cette catégorie contient des produits.");await prisma.category.delete({where:{id:req.params.id}});ok(res,{id:req.params.id});}
