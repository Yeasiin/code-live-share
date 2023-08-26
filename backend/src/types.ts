import { z } from "zod";

const envVariable = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
});

envVariable.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}
