import dotenv from 'dotenv';
dotenv.config();
import { z } from "zod";

const envVariables = z.object({
  GOOGLE_PLACES_API_KEY: z.string(),
});

envVariables.parse(import.meta.env);

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}
