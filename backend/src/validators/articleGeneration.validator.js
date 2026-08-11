import {z} from "zod";
const categoryMap={skincare:"SKINCARE",solaires:"SOLAIRES",cheveux:"CHEVEUX",nails:"NAILS"};
export const articleGenerationSchema=z.object({body:z.object({topic:z.string().trim().min(5).max(240),category:z.string().trim().transform(value=>categoryMap[value.toLowerCase()]??value.toUpperCase()).pipe(z.enum(["SKINCARE","SOLAIRES","CHEVEUX","NAILS"])),productIds:z.array(z.string().min(1)).max(12).default([])}),params:z.any().optional(),query:z.any().optional()});
