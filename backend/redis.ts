import { connect } from "https://deno.land/x/redis/mod.ts";

export const redis = await connect({
	hostname: "127.0.0.1",
	port: 6379,
});
