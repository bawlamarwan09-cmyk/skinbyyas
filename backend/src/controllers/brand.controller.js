import { prisma } from "../config/prisma.js";
import { AppError,ok } from "../utils/api.js";
export async function listBrands(_req,res){ok(res,await prisma.brand.findMany({where:{isActive:true},orderBy:{name:"asc"}}));}
export async function getBrand(req,res){const item=await prisma.brand.findFirst({where:{slug:req.params.slug,isActive:true}});if(!item)throw new AppError(404,"BRAND_NOT_FOUND","Marque introuvable.");ok(res,item);}
export async function listAdminBrands(_req,res){ok(res,await prisma.brand.findMany({include:{_count:{select:{products:true}}},orderBy:{name:"asc"}}));}
export async function createBrand(req,res){ok(res,await prisma.brand.create({data:req.body}),201);}
export async function updateBrand(req,res){ok(res,await prisma.brand.update({where:{id:req.params.id},data:req.body}));}
export async function deleteBrand(req,res){if(await prisma.product.count({where:{brandId:req.params.id}}))throw new AppError(409,"BRAND_IN_USE","Cette marque est associée à des produits.");await prisma.brand.delete({where:{id:req.params.id}});ok(res,{id:req.params.id});}
