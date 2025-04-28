module.exports.config = {
	name: "gali",
	version: "1.0.5",
	role: 0,
	author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
	prefix: false,
	category: "abuse",
	guide: "smart gali detector with random reply and reaction",
	cooldowns: 5
};

const badwords = [
  "মাগি", "বেস্যা", "খানকি মাগি", "চুদানি", "চুদা", "চুদ", "ভুদা", "buda", "gali", "galibaz",
  "সাওয়া", "khanki", "maderxud", "xud", "xuda", "xudi", "cuda", "cudi", "mgi", "nodi", "নডি",
  "মাদারচুদ", "ষুদা", "ষুদি", "bal", "খাংকির পোলা", "খানকি মাকি", "আবাল", "murgi", "baler",
  "salar", "sala", "sawwa", "sawya", "tor mare xudi", "vuda", "heda", "bap", "মাদারচোদ",
  "বোকাচোদা", "চুতমারানি", "পাকা মাগি", "তোর মায়ের", "তোর বাপের", "ভগ", "গুদ", "পুটকি", "পুটু",
  "মাদারফাকার", "ফাক ইউ", "fuck you", "f*ck", "fucker", "গালি", "চোদা", "চুতিয়া", "cud",
  "chod", "chud", "bitch", "motherchod", "madarchod", "gaand", "gaand mara", "পুটকির ছেলে",
  "পুতকির পোলা", "মাগির পোলা", "ভগবান চুদুক", "খানকির পোলা", "ছাগলের বাচ্চা", "ছাগল",
  "doger baccha", "doger pilla", "রেন্ডি", "পতিতা"
];

const randomReplies = [
  "╰┈➤ এখানে গালাগালি করলে মুখ ধইরা সেলাই কইরা দিমু..!! 😾",
  "╰┈➤ ভাইয়া গালি বাদ দেন, চুপচাপ থাকেন..!⚠️",
  "╰┈➤ আবার যদি গালি দেহি, সরাসরি মিউট কইরা দিমু..!⛔",
  "╰┈➤ গালি দিলে পাপ হয় বাইনসুদ..! 😒✂️",
  "╰┈➤ গালি দিস না বোকাচদা..!😼🤦‍♂️",
  "╰┈➤ গালি দিলে বউ থাকবে না..!😒😼",
  "╰┈➤ ভালো হও মাসুদ..!👀🐸"
];

const randomReactions = ["😾", "⚠️", "⛔", "😠️", "❌", "😡", "👿"];

module.exports.onChat = function({ api, event }) {
	const { threadID, messageID, body } = event;
	if (!body) return;

	let message = body.toLowerCase();
	message = message.replace(/[\s\W_]+/g, ""); // Normalize message

	for (const word of badwords) {
		const pattern = new RegExp(word.replace(/\s+/g, ''), "i"); // Match ignoring spaces
		if (pattern.test(message)) {
			const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
			const reaction = randomReactions[Math.floor(Math.random() * randomReactions.length)];

			api.sendMessage({ body: reply }, threadID, messageID);
			api.setMessageReaction(reaction, messageID, (err) => {}, true);
			break;
		}
	}
};

module.exports.onStart = function({ api, event }) { };
