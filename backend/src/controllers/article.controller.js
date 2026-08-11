import { prisma } from "../config/prisma.js";
import { AppError,ok,pagination } from "../utils/api.js";
import sanitizeHtml from "sanitize-html";
const cleanContent=content=>sanitizeHtml(content,{allowedTags:["p","h2","h3","strong","em","ul","ol","li","a","br"],allowedAttributes:{a:["href","target","rel"]},allowedSchemes:["http","https","mailto"],transformTags:{a:(tagName,attribs)=>({tagName,attribs:{...attribs,rel:"noopener noreferrer",...(attribs.target==="_blank"&&{target:"_blank"})}})},exclusiveFilter:frame=>frame.tag==="p"&&!frame.text.trim()&&!frame.mediaChildren.length});
const articleData=body=>({...body,...(typeof body.content==="string"&&{content:cleanContent(body.content)})});
export async function listArticles(req,res){const {page,limit,category}=req.query;const where={isPublished:true,...(category&&{category})};const [data,total]=await prisma.$transaction([prisma.article.findMany({where,orderBy:{publishedAt:"desc"},skip:(page-1)*limit,take:limit}),prisma.article.count({where})]);ok(res,{data,pagination:pagination(page,limit,total)});}
export async function getArticle(req,res){const item=await prisma.article.findFirst({where:{slug:req.params.slug,isPublished:true}});if(!item)throw new AppError(404,"ARTICLE_NOT_FOUND","Article introuvable.");ok(res,item);}
export async function listAdminArticles(req,res){const page=Number(req.query.page||1),limit=Math.min(Number(req.query.limit||20),100);const [data,total]=await prisma.$transaction([prisma.article.findMany({orderBy:{updatedAt:"desc"},skip:(page-1)*limit,take:limit}),prisma.article.count()]);ok(res,{data,pagination:pagination(page,limit,total)});}
export async function getAdminArticle(req,res){const item=await prisma.article.findUnique({where:{id:req.params.id}});if(!item)throw new AppError(404,"ARTICLE_NOT_FOUND","Article introuvable.");ok(res,item);}
export async function createArticle(req,res){ok(res,await prisma.article.create({data:articleData(req.body)}),201);}
export async function updateArticle(req,res){ok(res,await prisma.article.update({where:{id:req.params.id},data:articleData(req.body)}));}
export async function deleteArticle(req,res){await prisma.article.delete({where:{id:req.params.id}});ok(res,{id:req.params.id});}
export async function publishArticle(req,res){ok(res,await prisma.article.update({where:{id:req.params.id},data:{isPublished:req.body.isPublished,publishedAt:req.body.isPublished?new Date():null}}));}
