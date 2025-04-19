module.exports = {
	config: {
		name: "bestfriend",
		version: "1.0",
		author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		description: {
			en: "Match two random members as BFFs"
		},
		category: "fun",
		guide: {
			en: "{pn}"
		}
	},

	onStart: async function ({ message, participantsData }) {
		const members = participantsData.filter(p => p.inGroup);
		if (members.length < 2) return message.reply("Not enough members to match!");

		let [a, b] = [members[Math.floor(Math.random() * members.length)]];
		do {
			b = members[Math.floor(Math.random() * members.length)];
		} while (a.userID === b.userID);

		const percent = Math.floor(Math.random() * 41) + 60; // 60%–100%
		return message.reply(`💞 𝗕𝗲𝘀𝘁𝗳𝗿𝗶𝗲𝗻𝗱 𝗠𝗮𝘁𝗰𝗵.!🎀\n━━━━━━━━━━━━━━━━━━━\n🫂| ${a.name} ❤️ ${b.name}\n🫂| 𝐅𝐫𝐢𝐞𝐧𝐝𝐬𝐡𝐢𝐩 𝐋𝐞𝐯𝐞𝐥: ${percent}%`);
	}
};
