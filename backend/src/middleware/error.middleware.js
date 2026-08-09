import { AppError } from "../utils/api.js";
export function notFound(req, _res, next) { next(new AppError(404, "ROUTE_NOT_FOUND", "Route introuvable.")); }
export function errorHandler(err, _req, res, _next) {
  const prismaMap = { P2002:[409,"DUPLICATE_VALUE","Une valeur unique existe déjà."], P2003:[409,"RELATION_CONFLICT","Cette ressource est encore utilisée."], P2025:[404,"RESOURCE_NOT_FOUND","Ressource introuvable."] };
  const mapped = prismaMap[err.code];
  const status = err.status ?? mapped?.[0] ?? 500;
  const code = mapped?.[1] ?? (err.code && typeof err.code === "string" && !err.code.startsWith("P") ? err.code : "INTERNAL_ERROR");
  const message = status >= 500 ? "Une erreur interne est survenue." : (mapped?.[2] ?? err.message);
  if (process.env.NODE_ENV !== "production" && status >= 500) console.error(err);
  res.status(status).json({ success: false, error: { code, message } });
}
