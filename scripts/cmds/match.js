const axios = require("axios");

module.exports = {
	config: {
		name: "match",
		aliases: ["cricket"],
		version: "1.0",
		author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
		countDown: 5,
		role: 0,
		shortDescription: "Get cricbuzz match info",
		longDescription: {
			en: "Provides you the information of cricket matches"
		},
		category: "info",
		guide: {
			en: "{pn}"
		}
	},
	onStart: async function ({ api, event, args, message }) {
		try {
			const response = await axios.get("https://anbusec.xyz/api/sports/match?apikey=jmBOjQSgq5mK8GScw9AB");

			const message = {
				body: `𝗛𝗲𝗿𝗲 𝗦𝗼𝗺𝗲 𝗠𝗮𝘁𝗰𝗵 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻.. 📑:\n\n` +
					`❏ 𝗡𝗮𝗺𝗲: ${response.data.data.name}\n` +
					`❏ 𝗦𝘁𝗮𝘁𝘂𝘀: ${response.data.data.status}\n` +
					`❏ 𝗕𝗶𝗼𝗴𝗿𝗮𝗽𝗵𝘆: ${response.data.data.url}`,
				attachment: await global.utils.getStreamFromURL('http://tinyurl.com/yp39z4pt')
			};

			return api.sendMessage(message, event.threadID);
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while fetching the information.");
		}
	}
};
