import { z } from "zod";
import { superdeno } from "https://deno.land/x/superdeno@4.9.0/mod.ts";
import { app } from "../src/server.ts";

Deno.test("POST /weather", async () => {
	const request = superdeno(app.fetch);

	await request.post("/weather")
		.send({ lat: 34.0522, lng: -118.2437 })
		.expect(200)
		.expect((res) => {
			console.log(res.text);

			z.object({
				name: z.literal("Los Angeles"),
			}).parse(JSON.parse(res.text));
		});
});
