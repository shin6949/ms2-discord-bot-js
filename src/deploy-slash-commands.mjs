import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as commands from './commands/command-index.mjs';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env'});

const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if(token === null) {
	console.log("Token is NULL");
	process.exit(0);
}

const toDeployCommands = [];
for (const commandName of Object.keys(commands)) {
	toDeployCommands.push(commands[commandName].data);
}

const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationCommands(client_id), { body: toDeployCommands })
rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: toDeployCommands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);