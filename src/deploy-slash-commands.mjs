import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env'});

const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if(token === null) {
	console.log("Token is NULL");
	process.exit(0);
}

// TODO: 정의 필요
const commands = null;

const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationCommands(client_id), { body: commands })
rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);