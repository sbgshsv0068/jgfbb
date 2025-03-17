const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["files", "sendfile"],
		version: "1.0",
		author: "MR.AYAN", //** original author fb I'd : https://m.me/NOOBS.DEVELOPER.AYAN **//
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100063487970328"];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage("📌 𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗡𝗼 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗧𝗼 𝗨𝘀𝗲𝗱 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱...", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗙𝗶𝗹𝗲 𝗡𝗮𝗺𝗲.", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`𝗙𝗶𝗹𝗲 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
