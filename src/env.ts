import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  HOST: z.string().default('localhost'),
  TZ: z.string().default('Asia/Tehran'),
  VERSION: z.string().default('1.0.0'),
});

export type EnvVars = z.infer<typeof envSchema>;

export const env: EnvVars = envSchema.parse(process.env);
