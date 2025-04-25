module.exports = {
	config: {
		name: "edit",
		version: "1.2",
		author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		role: 2,
		shortDescription: "Rewrite a bot's message",
		longDescription: "Rewrite a bot's message by replying to it with 'edit <message>'.",
		category: "owner",
		guide: {
			en: "{p}{n} <message>",
		},
	},

	onStart: async function ({ api, event, args }) {
		if (!event.messageReply || !event.messageReply.messageID) {
			api.sendMessage("Please reply to a bot's message to rewrite it.", event.threadID, event.messageID);
			return;
		}

		const newMessage = args.join(" ");
		if (!newMessage) {
			api.sendMessage("Please provide the new message content.", event.threadID, event.messageID);
			return;
		}

		try {
			await api.unsendMessage(event.messageReply.messageID);

			
			api.sendMessage(newMessage, event.threadID, (err, messageInfo) => {
				if (err) console.error("Error sending new message:", err);
			});
		} catch (error) {
			console.error("Error editing message:", error);
			api.sendMessage("Failed to rewrite the message. Make sure the bot has permission and try again.", event.threadID, event.messageID);
		}
	},
};
