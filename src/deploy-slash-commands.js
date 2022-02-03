const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// DEV, PROD 구분 코드 필요 => DEV 시 dotenv 사용, PROD 시 미사용 (Docker Container 상에서 Environment variables가 지정 되어 있음.)
require('dotenv').config({ path: __dirname + '/../.env'});
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

/*
	같은 이름일 때, 업데이트
	다른 이름일 때, 추가
 */

// 상수들을 저장하는 파일
const constants = require("./constants.js")

const commands = [
	// OX 명령어
	new SlashCommandBuilder().setName(constants.OX_QUIZ_COMMAND.COMMAND_NAME)
		.setDescription(constants.OX_QUIZ_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(constants.OX_QUIZ_COMMAND.OPTION_NAME)
				.setDescription(constants.OX_QUIZ_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
		),

	// 미겜 명령어
	new SlashCommandBuilder().setName(constants.MINIGAME_COMMAND.COMMAND_NAME)
		.setDescription(constants.MINIGAME_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(constants.MINIGAME_COMMAND.OPTION_NAME)
				.setDescription(constants.MINIGAME_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
				.addChoices([
					[constants.COMMON_CONSTANTS.SOON, constants.COMMON_CONSTANTS.SOON],
					[constants.COMMON_CONSTANTS.NEXT, constants.COMMON_CONSTANTS.NEXT]
				])
		),

	// 필드보스 명령어
	new SlashCommandBuilder().setName(constants.FIELD_BOSS_COMMAND.COMMAND_NAME)
		.setDescription(constants.FIELD_BOSS_COMMAND.COMMAND_DESCRIPTION)
		.addSubcommand(subcommand =>
			subcommand.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_NAME)
				.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_NAME)
						.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_DESCRIPTION)
						.setRequired(true)
						.addChoices([
							[constants.COMMON_CONSTANTS.SOON, constants.COMMON_CONSTANTS.SOON],
							[constants.COMMON_CONSTANTS.NEXT, constants.COMMON_CONSTANTS.NEXT]
						]))
		)
		.addSubcommand(subcommand =>
			subcommand.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_NAME)
				.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_NAME)
						.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_DESCRIPTION)
						.setRequired(false)
						.addChoices(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_CHOICES)
				)
		)
		.addSubcommand(subcommand =>
			subcommand.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_NAME)
				.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_NAME)
						.setDescription(constants.FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_DESCRIPTION)
						.setRequired(false)
				)
		),

	// 군단전 명령어
	new SlashCommandBuilder().setName(constants.LEGION_WAR_COMMAND.COMMAND_NAME)
		.setDescription(constants.LEGION_WAR_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(constants.LEGION_WAR_COMMAND.OPTION_NAME)
				.setDescription(constants.LEGION_WAR_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
				.addChoices([
					[constants.COMMON_CONSTANTS.SOON, constants.COMMON_CONSTANTS.SOON],
					[constants.COMMON_CONSTANTS.NEXT, constants.COMMON_CONSTANTS.NEXT]
				])
		),

	// 제보 명령어
	new SlashCommandBuilder().setName(constants.REPORT_COMMAND.COMMAND_NAME)
		.setDescription(constants.REPORT_COMMAND.COMMAND_DESCRIPTION),

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationCommands(client_id), { body: commands })
rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);