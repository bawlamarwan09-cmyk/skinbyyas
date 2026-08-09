import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  FRONTEND_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("8h"),
  SHIPPING_COST_MAD: z.coerce.number().nonnegative().default(0),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(`Configuration invalide: ${parsed.error.issues.map(i => i.path.join(".")).join(", ")}`);
}
export const env = parsed.data;
