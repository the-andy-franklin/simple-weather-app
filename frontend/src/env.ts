import { z } from "zod";

export const env = z.object({
  VITE_GOOGLE_PLACES_API_KEY: z.string({ message: 'VITE_GOOGLE_PLACES_API_KEY is required' }),
  VITE_API_URL: z.string({ message: 'VITE_API_URL is required' }),
}).parse(import.meta.env);
