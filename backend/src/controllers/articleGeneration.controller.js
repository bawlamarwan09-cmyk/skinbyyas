import {ok} from "../utils/api.js";
import {generateArticleDraft} from "../services/articleGenerator.service.js";
export async function generateArticle(req,res){ok(res,await generateArticleDraft(req.body));}

