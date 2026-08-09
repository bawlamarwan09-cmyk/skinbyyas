import { AppError } from "../utils/api.js";
export const validate = schema => (req, _res, next) => {
  const result = schema.safeParse({ body:req.body, query:req.query, params:req.params });
  if (!result.success) return next(new AppError(400, "VALIDATION_ERROR", result.error.issues[0]?.message ?? "Données invalides."));
  if (result.data.body !== undefined) req.body = result.data.body;
  if (result.data.params !== undefined) req.params = result.data.params;
  if (result.data.query !== undefined) Object.defineProperty(req, "query", { value: result.data.query, configurable: true });
  next();
};
