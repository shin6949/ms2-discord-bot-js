const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config({ path: __dirname + '/../.env'});
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

/*
	같은 이름일 때, 업데이트
	다른 이름일 때, 추가
 */
const commands = [
	new SlashCommandBuilder().setName('ox')
		.setDescription('OX 퀴즈쇼 족보를 검색합니다.')
		.addStringOption(option =>
			option.setName('검색어')
				.setDescription("문제의 일부를 입력하여 검색합니다.")
				.setRequired(true)
		),
	new SlashCommandBuilder().setName('미겜')
		.setDescription('이번 시간에 나오는 미니게임을 봅니다.')
		.addBooleanOption(option =>
			option.setName('이번')
				.setDescription('True 시, 이번 시간에 나오는 미니게임, False 시, 다음 시간에 나오는 미니게임이 나옵니다.')
		),
	new SlashCommandBuilder().setName('필보')
		.setDescription('다음 시간에 나오는 미니게임을 봅니다.')
		.addNumberOption(option =>
			option.setName('분')
				.setDescription('숫자를 입력하면 해당 분에 등장하는 보스의 정보를 보여줍니다.')
				.setRequired(false)
		)
		.addStringOption(option =>
			option.setName('이름')
				.setDescription('이름을 입력하면 해당하는 보스의 정보를 보여줍니다.')
				.setRequired(false)
		),
	new SlashCommandBuilder().setName('다음필보')
		.setDescription('다음 시간에 나오는 필드보스의 정보를 봅니다.'),
	new SlashCommandBuilder().setName('군단')
		.setDescription('이번 시간에 나오는 군단전의 정보를 봅니다.'),
	new SlashCommandBuilder().setName('다음군단')
		.setDescription('다음 시간에 나오는 군단전의 정보를 봅니다.'),
	new SlashCommandBuilder().setName('제보')
		.setDescription('제보를 위한 이메일 정보를 봅니다.')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);