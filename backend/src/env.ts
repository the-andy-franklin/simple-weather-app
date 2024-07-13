import { z } from "zod";
import { load } from "dotenv";
import { Try } from "fp-try";
import axios from "axios";

await Try(async () => {
	const start = performance.now();
	await axios.get("https://andy-franklins-weather-app.vercel.app");
	const end = performance.now();
	console.log(`Network latency is ${end - start}ms`);
});

const kv = await Deno.openKv();
const matches = kv.list({ prefix: [] });
for await (const { key } of matches) {
	kv.delete(key);
}

await load({ export: true });

export const env = z.object({
	OPEN_WEATHER_MAP_API_KEY: z.string({ message: "OPEN_WEATHER_MAP_API_KEY is required" }),
}).parse(Deno.env.toObject());
