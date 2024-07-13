import { connect } from "redis";

export const redis = await connect({
	hostname: "127.0.0.1",
	port: 6379,
})
	.then((client) => {
		console.log("Connected to Redis");

		return client;
	})
	.catch(() => {
		console.log("Failed to connect to Redis");
	});

// NOTE: redis is only being used for development so I don't blow through my API limit
// it probably won't be needed/included in the final solution
