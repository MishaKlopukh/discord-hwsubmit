const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

global.files_list = [];

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
for (const file of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `No arguments provided ${message.author}!`;

		if (command.usage) {
			reply += `\nusage: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if (reaction.emoji.name === '💯') {
		client.commands.get('addfile').execute(reaction.message);
		reaction.remove().catch(error => console.error('Failed to remove reactions: ', error));
	}
});

client.login(config.token);
