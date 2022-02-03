import dotenv from 'dotenv'
import {Client, Collection, Intents} from "discord.js";
import { default as command} from './commands/report-command.mjs';
// import * as commands from 'commands';
// 상수들을 가져옴
import fs from 'fs';

// Dev, Prod 구분 코드 필요.
dotenv.config({ path: '../.env'});
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));

client.commands.set(command.data.name, command);
// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	console.log(command);
// 	client.commands.set(command.data.name, command);
// }

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
client.login(process.env.DISCORD_BOT_TOKEN);