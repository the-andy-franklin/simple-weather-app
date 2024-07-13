import { z } from "zod";
import { load } from "dotenv";

const env_vars = await load();

export const env = z.object({
	OPEN_WEATHER_MAP_API_KEY: z.string({ message: "OPEN_WEATHER_MAP_API_KEY is required" }),
}).parse(env_vars);
