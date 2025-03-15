module.exports = {
	config: {
			name: "kar bot",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "kar bot") return message.reply("-🌸🌷আসসালামুয়ালাইকুম 😻🫶\n-‎➜ 𝗛𝗲𝘆 𝗜𝗺 𝗥𝗮𝗻𝗮 𝗕𝗼𝘁 😉\n\n‎╲╭━<━━╮╲╲\n╲┃╭╮╭╮┃╲╲\n┗┫┏━━┓┣┛╲\n╲┃╰━━╯┃ ╲\n╲╰┳━━┳╯╲╲\n╲╲┛╲╲┗╲╲╲\n\nআমার বস এর নাম রানা\n\n আমার বসের সম্পর্কে জানতে অথবা বসের ফেসবুক আইডি পেতে টাইপ করুন👇\n\n /info");
}
};
