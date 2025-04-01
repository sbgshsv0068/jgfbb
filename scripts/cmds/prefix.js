const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: "🔧 আপনার গ্রুপ চ্যাট বা পুরো সিস্টেমের বটের কমান্ড প্রিফিক্স পরিবর্তন করুন (শুধুমাত্র অ্যাডমিন বটের জন্য)",
		category: "⚙️ Config",
		guide: {
			vi: "   {pn} <new prefix>: 📝 আপনার গ্রুপ চ্যাটের নতুন প্রিফিক্স পরিবর্তন করুন"
				+ "\n   উদাহরণ:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: 🌍 সম্পূর্ণ সিস্টেমের নতুন প্রিফিক্স পরিবর্তন করুন (শুধু অ্যাডমিন বট)"
				+ "\n   উদাহরণ:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: 🔄 আপনার গ্রুপ চ্যাটের প্রিফিক্স ডিফল্টে রিসেট করুন",
			en: "   {pn} <new prefix>: 📝 Change the new prefix in your box chat"
				+ "\n   Example:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: 🌍 Change the new prefix in the system bot (only admin bot)"
				+ "\n   Example:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: 🔄 Reset the prefix in your box chat to default"
		}
	},

	langs: {
		vi: {
			reset: "✅ আপনার প্রিফিক্স ডিফল্টে রিসেট করা হয়েছে: %1",
			onlyAdmin: "⚠️ শুধুমাত্র অ্যাডমিন বটের প্রিফিক্স পরিবর্তন করতে পারবেন",
			confirmGlobal: "🌍 সিস্টেমের প্রিফিক্স পরিবর্তন নিশ্চিত করতে এই মেসেজে রিয়্যাক্ট করুন",
			confirmThisThread: "💬 আপনার গ্রুপ চ্যাটের প্রিফিক্স পরিবর্তন নিশ্চিত করতে এই মেসেজে রিয়্যাক্ট করুন",
			successGlobal: "🎉 সিস্টেম বটের প্রিফিক্স সফলভাবে পরিবর্তন হয়েছে: %1",
			successThisThread: "🎉 আপনার গ্রুপ চ্যাটের প্রিফিক্স সফলভাবে পরিবর্তন হয়েছে: %1",
			myPrefix: "🌐 **সিস্টেম প্রিফিক্স**: %1\n🛸 **আপনার গ্রুপ চ্যাটের প্রিফিক্স**: %2"
		},
		en: {
			reset: "✅ Your prefix has been reset to default: %1",
			onlyAdmin: "⚠️ Only admin can change prefix of system bot",
			confirmGlobal: "🌍 Please react to this message to confirm change prefix of system bot",
			confirmThisThread: "💬 Please react to this message to confirm change prefix in your box chat",
			successGlobal: "🎉 Changed prefix of system bot to: %1",
			successThisThread: "🎉 Changed prefix in your box chat to: %1",
			myPrefix: "‎┏━━━━━━━━━━━━━━━━┓\n┣━━[🍒𝐑𝟒𝐍𝟒-𝐁𝐎𝐓•🤖 ]━━┫\n┣━━━━━━━━━━━━━━━━┫\n┣━❯⛎ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗽𝗿𝗲𝗳𝗶𝘅: [ %1 ]\n┣━❯🔐 𝗬𝗼𝘂𝗿 𝗯𝗼𝘅 𝗽𝗿𝗲𝗳𝗶𝘅: [ %2 ]\n┗━━━━━━━━━━━━━━━━➢"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0]) return message.SyntaxError();

		// রিসেট অপশন
		if (args[0] === "reset") {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = { commandName, author: event.senderID, newPrefix };

		// যদি গ্লোবাল প্রিফিক্স সেট করতে চায়, তবে অ্যাডমিন চেক করা হবে
		if (args[1] === "-g") {
			if (role < 2) return message.reply(getLang("onlyAdmin"));
			formSet.setGlobal = true;
		} else {
			formSet.setGlobal = false;
		}

		// ইউজারের কনফার্মেশন নেওয়া হচ্ছে
		const confirmMessage = formSet.setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread");
		return message.reply(confirmMessage, (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;

		// কেবলমাত্র যিনি কমান্ড দিয়েছেন, তিনিই রিয়্যাক্ট করতে পারবেন
		if (event.userID !== author) return;

		// গ্লোবাল বা লোকাল প্রিফিক্স সেট করা হচ্ছে
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		} else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		// কেউ যদি "prefix" লিখে পাঠায়, তবে বর্তমান প্রিফিক্স জানানো হবে
		if (event.body && event.body.toLowerCase() === "prefix") {
			return () => message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
		}
	}
};
