import { z } from "zod";

const envVariable = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
});

envVariable.parse(process.env);

declare global {
  // adding types on node process
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
  // extending the request to add user
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}
