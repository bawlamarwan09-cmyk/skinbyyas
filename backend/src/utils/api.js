export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
export const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
export const decimal = value => value == null ? null : value.toFixed(2);
export const productView = product => ({ ...product, price: decimal(product.price), compareAtPrice: decimal(product.compareAtPrice) });
export const pagination = (page, limit, total) => ({ page, limit, total, totalPages: Math.ceil(total / limit) });
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
