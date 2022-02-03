require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '9' }).setToken(token);

// rest.get(Routes.applicationCommands(clientId))
// 특정 서버의 명령어 얻어옴.
rest.get(Routes.applicationGuildCommands(clientId, guildId))
	.then(data => {
		const promises = [];
		for (const command of data) {
			// const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
			// 특정 서버의 명령어 삭제
			const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
			promises.push(rest.delete(deleteUrl));
		}
		return Promise.all(promises);
	});
