import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/api.js";
export function authenticate(req, _res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
  if (!token) return next(new AppError(401, "AUTH_REQUIRED", "Authentification requise."));
  try { req.auth = jwt.verify(token, env.JWT_SECRET); next(); }
  catch { next(new AppError(401, "INVALID_TOKEN", "Jeton invalide ou expiré.")); }
}
