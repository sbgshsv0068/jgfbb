const fs = require("fs");

module.exports = {
	config: {
		name: "upt",
		aliases: ["up2", "upt3"],
		version: "1.0",
		author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		role: 0,
		shortDescription: {
			en: "⏳ Displays the uptime of the bot."
		},
		longDescription: {
			en: "🕰️ Displays the amount of time that the bot has been running for."
		},
		category: "⚙️ System",
		guide: {
			en: "📌 Use {p}uptime to display the uptime of the bot."
		}
	},
	onStart: async function ({ api, event }) {
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `📅 ${days} 𝙳𝚊𝚢𝚜 🕒 ${hours} 𝙷𝚘𝚞𝚛𝚜 ⏰ ${minutes} 𝙼𝚒𝚗𝚒𝚝𝚎𝚜 ⏳ ${seconds} 𝚂𝚎𝚌𝚘𝚗𝚍𝚜`;

		const imagePath = "scripts/cmds/RANA/upt.jpg"; // ফাইলের সঠিক পাথ দিবে 

		if (fs.existsSync(imagePath)) {
			const stream = fs.createReadStream(imagePath);
			api.sendMessage(
				{
					body: `👋 𝙷𝚎𝚕𝚕𝚘 𝚄𝚜𝚎𝚛 ! 👤\n 🤖 𝚃𝚑𝚎 𝙱𝚘𝚝 𝙷𝚊𝚜 𝙱𝚎𝚎𝚗 𝚁𝚞𝚗𝚗𝚒𝚗𝚐 𝙵𝚘𝚛:\n\n${uptimeString} 🚀`,
					attachment: stream
				}, 
				event.threadID
			);
		} else {
			api.sendMessage(
				`👋 𝙷𝚎𝚕𝚕𝚘 𝚄𝚜𝚎𝚛 ! 👤\n 🤖 𝚃𝚑𝚎 𝙱𝚘𝚝 𝙷𝚊𝚜 𝙱𝚎𝚎𝚗 𝚁𝚞𝚗𝚗𝚒𝚗𝚐 𝙵𝚘𝚛:\n\n${uptimeString} 🚀\n\n⚠️ (Image not found)`, 
				event.threadID
			);
		}
	}
};
