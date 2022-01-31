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
	new SlashCommandBuilder().setName('ping').setDescription('Replies with'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user-info').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('beep').setDescription('Replies with Boop!'),
	new SlashCommandBuilder().setName('테스트').setDescription('Replies with user-info'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);