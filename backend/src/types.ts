import { z } from "zod";

const envVariable = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  MY_MAIL: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  //
  BREVO_HOST: z.string(),
  BREVO_PORT: z.string(),
  BREVO_USER: z.string(),
  BREVO_PASSWORD: z.string(),
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
