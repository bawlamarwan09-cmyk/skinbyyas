import { z } from "zod";
import { slug, pageQuery } from "./common.js";
const article=z.object({title:z.string().trim().min(3).max(240),slug,excerpt:z.string().max(1000).nullish(),content:z.string().min(1).max(200000),coverImage:z.string().url().nullish(),category:z.enum(["SKINCARE","SOLAIRES","CHEVEUX","NAILS"]),seoTitle:z.string().max(200).nullish(),seoDescription:z.string().max(320).nullish()});
export const articleCreateSchema=z.object({body:article,query:z.any().optional(),params:z.any().optional()});
export const articleUpdateSchema=z.object({body:article.partial().refine(v=>Object.keys(v).length>0),params:z.object({id:z.string()}),query:z.any().optional()});
export const articlePublishSchema=z.object({body:z.object({isPublished:z.boolean()}),params:z.object({id:z.string()}),query:z.any().optional()});
export const articleListSchema=z.object({body:z.any().optional(),params:z.any().optional(),query:pageQuery.extend({category:z.enum(["SKINCARE","SOLAIRES","CHEVEUX","NAILS"]).optional()})});
