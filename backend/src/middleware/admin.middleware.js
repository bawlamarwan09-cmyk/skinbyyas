import { AppError } from "../utils/api.js";
export function requireAdmin(req, _res, next) { if (req.auth?.role !== "ADMIN") return next(new AppError(403, "ADMIN_REQUIRED", "Accès administrateur requis.")); next(); }
