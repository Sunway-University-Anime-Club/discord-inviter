import { Client, IntentsBitField } from 'discord.js';

// Create the discord client
export const discordClient = new Client({
	intents: [IntentsBitField.Flags.GuildInvites, IntentsBitField.Flags.Guilds]
});

discordClient.on('ready', (client) => console.log(`${client.user.displayName} is ready.`));
