import {z} from "zod";
export const productGenerationSchema=z.object({body:z.object({name:z.string().trim().min(2).max(200),categoryId:z.string().min(1),brandId:z.string().min(1).nullable().optional(),verifiedDetails:z.string().trim().max(5000).optional().default("")}),params:z.any().optional(),query:z.any().optional()});
