module.exports = {
		config: {
				name: "noprefix3",
				version: "1.0", 
				author: "Loid Butter",
				countDown: 1,
				role: 0,
				category: "No Prefix3",
		},
		onReply: async function ({ event, message }) {
				const triggerPhrases = ["ai", "hello", "loid", " gpt"];
				if (event.body && triggerPhrases.includes(event.body.toLowerCase())) {
						return () => {
								return message.reply("Hello, there how may I help you today?\n please use $loid for any questions, \n or,\n\n use help for more information");
						}
				}
		},

		onStart: async function ({  }) {
		}
};
