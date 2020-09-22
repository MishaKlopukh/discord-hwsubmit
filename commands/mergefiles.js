const PDFMerge = require('pdf-merge');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'mergefiles',
	description: 'Generate and post the merged pdf.',
	aliases: ['merge', 'combine', 'getmerge'],
	execute(message) {
		PDFMerge(global.files_list).then((buffer) => {
			const attachment = new MessageAttachment(buffer, 'merged.pdf');
			message.channel.send(`${message.author} `, attachment);
		}).catch((err) => {
			console.log(err);
		});
	},
};
