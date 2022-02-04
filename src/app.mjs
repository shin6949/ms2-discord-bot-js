import dotenv from 'dotenv'
import {Client, Collection, Intents} from "discord.js";
import * as commands from './commands/command-index.mjs';
import {COMMON_CONSTANTS} from "./constants.mjs";

// 테스트
import {reportButton} from "./commands/ox-command.mjs";

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
	console.log(`Client ID: ${client.user.id} / Client Username: ${client.user.username}#${client.user.tag}`)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return;
	if(interaction.isButton()) {
		console.log(interaction.customId);

		await reportButton.execute(interaction);
	}

	if(interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		// 불러온 명령어를 기반으로 명령어 실행
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true });
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN).then(r => {

});