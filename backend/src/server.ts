import { Hono } from "hono/mod.ts";
import { cors } from "hono/middleware.ts";
import axios from "axios";
import { z } from "zod";
import { Try } from "fp-try";
import { env } from "../src/env.ts";
import { weather_schema } from "./validators/weather-schema.ts";

const kv = await Deno.openKv();

export const app = new Hono();
app.use(cors());

app.get("/health", (c) => {
	return c.json({ status: "ok" });
});

app.post("/weather", async (c) => {
	const body = await c.req.json();

	const parsed = Try(() =>
		z.object({
			lat: z.number(),
			lng: z.number(),
		}).parse(body)
	);
	if (parsed.failure) return c.json({ error: parsed.error.message }, 400);
	const { lat, lng } = parsed.data;

	// KV-store is only being used during development so I don't blow through my API limit
	const cached_weather = await kv.get<string>([lat, lng]);
	if (cached_weather.value) return c.text(cached_weather.value);

	const weather_response = await Try(() =>
		axios.get<unknown>(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${env.OPEN_WEATHER_MAP_API_KEY}`,
		).then(({ data }) => weather_schema.parse(data))
	);
	if (weather_response.failure) return c.json({ error: weather_response.error.message }, 500);

	await kv.set([lat, lng], JSON.stringify(weather_response.data), { expireIn: 1000 * 60 * 60 * 4 });
	return c.json(weather_response.data);
});

if (import.meta.main) {
	Deno.serve({ port: 3000 }, app.fetch);
}
