require('dotenv').config({ path: __dirname + '/../.env'});

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		interaction.reply('Pong.');
	} else if (commandName === 'beep') {
		interaction.reply('Boop.');
	} else if (commandName === 'server') {
		interaction.reply('Guild name: ' + interaction.guild.name + '\nTotal members: ' + interaction.guild.memberCount);
	} else if (commandName === 'user-info') {
		interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	} else if (commandName === '테스트') {
		interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);