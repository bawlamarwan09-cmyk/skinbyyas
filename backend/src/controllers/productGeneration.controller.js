import {ok} from "../utils/api.js";
import {generateProductDraft} from "../services/productGenerator.service.js";
export async function generateProduct(req,res){ok(res,await generateProductDraft(req.body));}

