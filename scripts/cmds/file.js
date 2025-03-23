const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["f"],
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "owner",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100063487970328",];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage(" এই কম্যান্ড আমি চালাইতে চাইছিলাম, কিন্তু সিস্টেম বললো—‘ভাই, এটা বড়দের জিনিস 😞!", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗙𝗶𝗹𝗲 𝗡𝗮𝗺𝗲.", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
