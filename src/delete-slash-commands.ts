import dotenv from 'dotenv'
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

dotenv.config({ path: '../.env'});
const token: string | null | undefined = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if(!token) {
	console.log("Token is Falsy");
	process.exit(1);
}

const rest = new REST({ version: '9' }).setToken(token);

// rest.get(Routes.applicationCommands(clientId))
// 특정 서버의 명령어 얻어옴.
rest.get(Routes.applicationGuildCommands(clientId, guildId))
	.then(data => {
		const promises = [];
		for (const command of data) {
			// 전체 서버의 명령어 삭제
			// const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
			// 특정 서버의 명령어 삭제
			const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
			promises.push(rest.delete(deleteUrl));
		}
		return Promise.all(promises);
	});
