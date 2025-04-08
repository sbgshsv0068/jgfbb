module.exports.config = {
	name: "all",
	version: "1.0.1",
	role: 0,
	author: "RANA",
	description: "Tag all members in the group",
	category: "box chat",
	usages: "all",
	countDowns: 5,
	dependencies: {
		"request": ""
	}
};

module.exports.onStart = async function ({ api, event, args }) {
	try {
		const botID = api.getCurrentUserID();
		const listUserID = event.participantIDs.filter(ID => ID !== botID);
		let body = args.length ? args.join(" ") : "📢 @everyone";
		let mentions = [];
		
		for (const idUser of listUserID) {
			mentions.push({ id: idUser, tag: "@everyone" });
		}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);
	} catch (e) {
		console.log(e);
	}
};
