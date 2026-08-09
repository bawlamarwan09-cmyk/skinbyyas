import rateLimit from "express-rate-limit";
const response = { success:false, error:{ code:"RATE_LIMITED", message:"Trop de tentatives. Réessayez plus tard." } };
export const loginLimiter = rateLimit({ windowMs:15*60*1000, limit:10, standardHeaders:"draft-8", legacyHeaders:false, message:response });
export const orderLimiter = rateLimit({ windowMs:10*60*1000, limit:20, standardHeaders:"draft-8", legacyHeaders:false, message:response });
export const reservationLimiter = rateLimit({ windowMs:10*60*1000, limit:10, standardHeaders:"draft-8", legacyHeaders:false, message:response });
