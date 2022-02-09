import dotenv from 'dotenv'
import {Client, Collection, Intents} from "discord.js";
// 명령 액션들
import * as commands from './commands/command-index.mjs';
import * as buttonCommands from "./commands/button-index.mjs";
// 상수
import {COMMON_CONSTANTS} from "./constants.mjs";
// Ban Check 용
import {default as requestToAPI} from './commands/request-to-api.mjs';

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
	console.log('Ready to receive commands');
	console.log(`Client ID: ${client.user.id} / Client Username: ${client.user.tag}`);
});

client.on('interactionCreate',  interaction => {
	// 불요불급 언급 및 메시지는 처리하지 않음.
	if (!interaction.isCommand() && !interaction.isButton()) return;

	console.log(`Time: ${new Date().toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale)} / Request User ID: ${interaction.user.id} / Type: ${interaction.type}`);

	// 사용 금지 유저 체크하기 위한 requestData
	const requestData = {
		uri: `${process.env.API_SERVER_URL}/ban/check/${interaction.user.id}`,
		method: "GET",
		json: true
	};

	// TODO: 코드 정리할 방법을 찾아야함.
	requestToAPI(requestData).then(async function (response) {
		let banned = response.body;

		// 차단 당한 유저라면 처리 중지
		if (banned) {
			console.log("This user is banned.");
			await interaction.reply({content: COMMON_CONSTANTS.BAN_MESSAGE, ephemeral: true});
			return;
		}

		try {
			if (interaction.isButton()) {
				const command = client.buttonActions.get(interaction.customId);
				await command.execute(interaction);
			}

			if (interaction.isCommand()) {
				const command = client.commands.get(interaction.commandName);
				await command.execute(interaction);
			}
		} catch (err) {
			console.error(err);
			try {
				await interaction.reply({content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true});
			} catch (err) {
				await interaction.editReply({content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true});
			}
		}
	}).catch(function (err) {
		console.error(err);
		console.log("Ban Check Failed.");
	});
});

client.login(process.env.DISCORD_BOT_TOKEN).then(r => {
	console.log("LOGIN SUCCESS.")
});