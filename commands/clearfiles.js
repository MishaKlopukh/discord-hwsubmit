const fs = require('fs');

module.exports = {
	name: 'clearfiles',
	description: 'Clear current queue of files for merging.',
	aliases: ['clf'],
	execute(message) {
		global.files_list.forEach((fname) => {
			fs.unlink(fname, (err) => {
				if (err) throw err;
				console.log("File is deleted.");
			});
			''
		});
		global.files_list.length = 0;
		message.channel.send('Files Cleared');
	},
};
