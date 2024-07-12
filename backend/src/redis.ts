import { connect } from "https://deno.land/x/redis@v0.32.4/mod.ts";

export const redis = await connect({
	hostname: "127.0.0.1",
	port: 6379,
}).catch(() => {});

// NOTE: redis is only being used for development so I don't blow through my API limit
// it probably won't be needed/included in the final solution
