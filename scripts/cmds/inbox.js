module.exports = {
	config: {
		name: "inbox",
		version: "1.0",
		author: "RB-BADOL-KHAN",
		role: 0,
		shortDescription: {
			en: "Adds the user to a specific thread."
		},
		longDescription: {
			en: "Adds the user to a specific thread and sends them a notification message."
		},
		category: "System",
		guide: {
			en: "Use {p}join to add yourself to the specified thread."
		}
	},
	onStart: async function ({ api, event, args }) {
		const threadID = "100063487970328"; // ID of the thread to add the user to

		try {
			await api.addUserToGroup(event.senderID, threadID);
			api.sendMessage("You have been added to the group chat. Please check your Spam or Message Request folder if you can't find the group chat.", event.senderID);
		} catch (error) {
			api.sendMessage("❤️আসসালামু•আলাইকুম💛\nআমি\n\n【/】R4N4•BOT___//❤️💜💚\n\n🤍আপনার জন্য কি হেল্প করতে পারি 💚", event.senderID);
		}
	}
};
