import { z } from "zod";
import { load } from "dotenv";

await load({ export: true });

export const env = z.object({
	OPEN_WEATHER_MAP_API_KEY: z.string(),
}).parse(Deno.env.toObject());
