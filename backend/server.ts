import { Hono } from "hono/mod.ts";
import { cors } from "hono/middleware.ts";
import z from "zod";
import axios from "axios";
import { Try } from "fp-try";
import { env } from "./env.ts";
import { weather_schema } from "./types/open-weather-map-response.ts";
import { redis } from "./redis.ts";

const app = new Hono();
app.use(cors());

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

	// redis is only being used during development, so I don't blow through my API limit
	// this will be removed before submitting the final version
	const cache_key = `weather-${lat}-${lng}`;
	const cached_weather = await redis.get(cache_key);
	if (cached_weather) return c.json(JSON.parse(cached_weather));

	const weather = await Try(() =>
		axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${env.OPEN_WEATHER_MAP_API_KEY}`,
		).then(({ data }) => weather_schema.parse(data))
	);
	if (weather.failure) return c.json({ error: weather.error.message }, 500);

	await redis.set(cache_key, JSON.stringify(weather.data), { ex: 3600 });

	return c.json(weather.data);
});

Deno.serve({ port: 3000 }, app.fetch);
