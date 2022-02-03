// ES6
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// DEV, PROD 구분 코드 필요 => DEV 시 dotenv 사용, PROD 시 미사용 (Docker Container 상에서 Environment variables가 지정 되어 있음.)

import 'dotenv/config'
const client_id = process.env.CLIENT_ID;
const guild_id = process.env.GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

/*
	같은 이름일 때, 업데이트
	다른 이름일 때, 추가
 */

// 상수들을 저장하는 파일
import { OX_QUIZ_COMMAND, MINIGAME_COMMAND, REPORT_COMMAND, LEGION_WAR_COMMAND, FIELD_BOSS_COMMAND, COMMON_CONSTANTS } from "./constants.mjs";

const commands = [
	// OX 명령어
	new SlashCommandBuilder().setName(OX_QUIZ_COMMAND.COMMAND_NAME)
		.setDescription(OX_QUIZ_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(OX_QUIZ_COMMAND.OPTION_NAME)
				.setDescription(OX_QUIZ_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
		),

	// 미겜 명령어
	new SlashCommandBuilder().setName(MINIGAME_COMMAND.COMMAND_NAME)
		.setDescription(MINIGAME_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(MINIGAME_COMMAND.OPTION_NAME)
				.setDescription(MINIGAME_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
				.addChoices([
					[COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
					[COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
				])
		),

	// 필드보스 명령어
	new SlashCommandBuilder().setName(FIELD_BOSS_COMMAND.COMMAND_NAME)
		.setDescription(FIELD_BOSS_COMMAND.COMMAND_DESCRIPTION)
		.addSubcommand(subcommand =>
			subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_NAME)
				.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_NAME)
						.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_DESCRIPTION)
						.setRequired(true)
						.addChoices([
							[COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
							[COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
						]))
		)
		.addSubcommand(subcommand =>
			subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_NAME)
				.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_NAME)
						.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_DESCRIPTION)
						.setRequired(false)
						.addChoices(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_CHOICES)
				)
		)
		.addSubcommand(subcommand =>
			subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_NAME)
				.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_DESCRIPTION)
				.addStringOption(option =>
					option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_NAME)
						.setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_DESCRIPTION)
						.setRequired(false)
				)
		),

	// 군단전 명령어
	new SlashCommandBuilder().setName(LEGION_WAR_COMMAND.COMMAND_NAME)
		.setDescription(LEGION_WAR_COMMAND.COMMAND_DESCRIPTION)
		.addStringOption(option =>
			option.setName(LEGION_WAR_COMMAND.OPTION_NAME)
				.setDescription(LEGION_WAR_COMMAND.OPTION_DESCRIPTION)
				.setRequired(true)
				.addChoices([
					[COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
					[COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
				])
		),

	// 제보 명령어
	new SlashCommandBuilder().setName(REPORT_COMMAND.COMMAND_NAME)
		.setDescription(REPORT_COMMAND.COMMAND_DESCRIPTION),

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationCommands(client_id), { body: commands })
rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);