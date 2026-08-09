import { z } from "zod";
import { email, phone, pageQuery } from "./common.js";
export const reservationCreateSchema=z.object({body:z.object({name:z.string().trim().min(2).max(160),phone,email:email.optional(),date:z.string().date(),time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),service:z.string().trim().max(160).optional(),notes:z.string().max(2000).optional()}),query:z.any().optional(),params:z.any().optional()});
export const reservationStatusSchema=z.object({body:z.object({status:z.enum(["PENDING","CONFIRMED","COMPLETED","CANCELLED"])}),params:z.object({id:z.string()}),query:z.any().optional()});
export const reservationListSchema=z.object({body:z.any().optional(),params:z.any().optional(),query:pageQuery.extend({status:z.enum(["PENDING","CONFIRMED","COMPLETED","CANCELLED"]).optional(),date:z.string().date().optional()})});
