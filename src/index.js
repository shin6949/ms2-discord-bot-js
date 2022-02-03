require('dotenv').config({ path: __dirname + '/../.env'});

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	console.log(`commandName: ` + commandName);
	// ~~ is Thinking 을 표출 (결과는 edit으로 표출)
	// interaction.deferReply();
	interaction.reply("Command Name: " + commandName);

	if (commandName === 'ox') {
		const keyword = interaction.options.getString("검색어");
		console.log("keyword: " + keyword)
		// interaction.followUp({content: "keyword: " + keyword, ephemeral: true})
	}

	// if (commandName === 'ox') {
	// 	interaction.reply('this is ox.');
	// } else if (commandName === '미겜') {
	// 	interaction.reply('this is 미겜');
	// } else if (commandName === 'server') {
	// 	interaction.reply('Guild name: ' + interaction.guild.name + '\nTotal members: ' + interaction.guild.memberCount);
	// } else if (commandName === 'user-info') {
	// 	interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	// } else if (commandName === '테스트') {
	// 	interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	// }
});

client.login(process.env.DISCORD_BOT_TOKEN);