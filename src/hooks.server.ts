import { env } from '$env/dynamic/private';
import { discordClient } from '$lib/server/discord';
import type { Handle } from '@sveltejs/kit';

// Connect to discord bot
discordClient.login(env.DISCORD_TOKEN);

// Let server handle responses by default
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};
