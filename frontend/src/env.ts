import { z } from "zod";

const env_parser = z.object({
  VITE_GOOGLE_PLACES_API_KEY: z.string(),
  VITE_API_URL: z.string(),
});

export const env = env_parser.parse(import.meta.env);
