import dotenv from 'dotenv'
import {Client, Collection, Intents} from "discord.js";

// 명령 액션들
import * as commands from './commands/command-index.mjs';
import * as buttonCommands from "./commands/button-index.mjs";

// 상수
import {COMMON_CONSTANTS} from "./constants.mjs";

// Dev, Prod 구분 코드 필요.
dotenv.config({ path: '../.env'});
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// commands의 파일을 불러와 명령어를 등록
client.commands = new Collection();
for (const commandName of Object.keys(commands)) {
	client.commands.set(commands[commandName].data.name, commands[commandName]);
}
console.log(`Registered Commands Num: ${client.commands.size}`);

// 버튼 액션들을 등록
client.buttonActions = new Collection();
for (const buttonCommandName of Object.keys(buttonCommands)) {
	const buttonCustomId = buttonCommands[buttonCommandName].button.components[0].customId;
	client.buttonActions.set(buttonCustomId, buttonCommands[buttonCommandName]);
}
console.log(`Registered Button Actions Num: ${client.buttonActions.size}`);

client.once('ready', () => {
	console.log('\nReady!');
	console.log(`Client ID: ${client.user.id} / Client Username: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	// 불요불급 언급 및 메시지는 처리하지 않음.
	if (!interaction.isCommand() && !interaction.isButton()) return;

	console.log(`Time: ${new Date().toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale)} 
	/ Request User ID: ${interaction.user.id} / Type: ${interaction.type}`);

	if(interaction.isButton()) {
		const command = client.buttonActions.get(interaction.customId);

		// 불러온 명령어를 기반으로 명령어 실행
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true });
		}
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
	console.log("LOGIN SUCCESS.\n")
});