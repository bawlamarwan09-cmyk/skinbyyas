import { AppError } from "../utils/api.js";
export const validate = schema => (req, _res, next) => {
  const result = schema.safeParse({ body:req.body, query:req.query, params:req.params });
  if (!result.success) return next(new AppError(400, "VALIDATION_ERROR", result.error.issues[0]?.message ?? "Données invalides."));
  Object.assign(req, result.data); next();
};
