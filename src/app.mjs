import dotenv from 'dotenv'
import {Client, Collection, Intents} from "discord.js";
import * as commands from './commands/index.mjs';

// Dev, Prod 구분 코드 필요.
dotenv.config({ path: '../.env'});
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// commands의 파일을 불러와 명령어를 등록
client.commands = new Collection();
for (const commandName of Object.keys(commands)) {
	client.commands.set(commands[commandName].data.name, commands[commandName]);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	// 불러온 명령어를 기반으로
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.DISCORD_BOT_TOKEN).then(r => console.error(r));