import { z } from "zod";

export const weather_schema = z.object({
	coord: z.object({
		lon: z.number(),
		lat: z.number(),
	}),
	weather: z.array(
		z.object({
			id: z.number(),
			main: z.string(),
			description: z.string(),
			icon: z.string(),
		}),
	),
	base: z.string(),
	main: z.object({
		temp: z.number(),
		feels_like: z.number(),
		temp_min: z.number(),
		temp_max: z.number(),
		pressure: z.number(),
		humidity: z.number(),
		sea_level: z.number(),
		grnd_level: z.number(),
	}),
	visibility: z.number(),
	wind: z.object({
		speed: z.number(),
		deg: z.number(),
		gust: z.number(),
	}),
	clouds: z.object({
		all: z.number(),
	}),
	rain: z.object({
		"1h": z.number(),
		"3h": z.number(),
	}),
	snow: z.object({
		"1h": z.number(),
		"3h": z.number(),
	}),
	dt: z.number(),
	sys: z.object({
		type: z.number(),
		id: z.number(),
		message: z.number(),
		country: z.string(),
		sunrise: z.number(),
		sunset: z.number(),
	}),
	timezone: z.number(),
	id: z.number(),
	name: z.string(),
	cod: z.number(),
}).deepPartial();
// I see that deepPartial got deprecated, but there's no context, no replacement, and it's still showing as valid in their docs,
// so I'm gonna use it until it breaks or there's a better alternative

export type Weather = z.infer<typeof weather_schema>;
