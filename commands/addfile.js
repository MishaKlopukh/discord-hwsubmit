const fetch = require('node-fetch')
const { nanoid } = require('nanoid');
const fs = require('fs');

module.exports = {
	name: 'addfile',
	description: 'Add attached pdf file to the merged pdf.',
	aliases: ['add'],
	execute(message) {
		if (!message.attachments.size) message.channel.send(`${message.author} Error: No file attached`);
		else if (!message.attachments.first().name.toLowerCase().endsWith('.pdf')) message.channel.send(`${message.author} Error: File is not pdf`);
		else {
			fetch(message.attachments.first().url).then(res => {
				let id = '/tmp/' + nanoid() + '.pdf';
				const dest = fs.createWriteStream(id);
				res.body.pipe(dest);
				global.files_list.push(id);
			});
			message.channel.send(`${message.author} File Added`);
		};
	},
};
