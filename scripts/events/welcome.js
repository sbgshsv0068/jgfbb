const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "সকাল 🌄",
			session2: "দুপুর 🌞",
			session3: "বিকাল 🏙️",
			session4: "সন্ধ্যা 🌃",
			welcomeMessage: "‎ ╔✦✦✦✦❖❖❖✦✦✦✦╗\n             ✨ ﷽ ✨\n🌸 আসসালামু আলাইকুম.!🥰\n ╚✦✦✦✦❖❖❖✦✦✦✦╝\n\n💝 আপনাদের গ্রুপে আমাকে যুক্ত করার জন্য অসংখ্য ধন্যবাদ! 😍🎉\n\n📢 🔹 বট প্রিফিক্স: %1 \n📢🔹 বটের সকল কমান্ড দেখতে টাইপ করুন: %1help 📜\n\n💫🌷 আপনাদের বিনোদন দেওয়ার জন্যই আমাকে তৈরি করা হয়েছে..! 😃🔥\n💫🌷 তাই মজা করুন, {session} উপভোগ করুন, আর দারুণ সময় কাটান..! 🥳🎊\n\n😕📢 তবে যদি কখনো আমার কথায় কষ্ট পান, দয়া করে ক্ষমাসুন্দর দৃষ্টিতে দেখবেন..! 😊🙏\n\n💖 ধন্যবাদ! ভালো থাকুন, সুস্থ থাকুন! 💖‎",
			multiple1: "you",
			multiple2: "you guys",
			defaultWelcomeMessage: `‎🌺✨ 𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂 𝗔𝗹𝗮𝗶𝗸𝘂𝗺 ✨🌺\n💖 𝗛𝗲𝗹𝗹𝗼 {userName},\n🌟 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 {multiple} আমাদের প্রিয় {boxName} গ্রুপে! 🎉🎊\n\💐 উপভোগ করুন শুভ {session} 💕\n\n📜 গ্রুপের নিয়ম-কানুন মেনে চলুন 📜\n🤝 সবার সাথে বন্ধুত্বপূর্ণ আচরণ করুন ❤️\n✨ গ্রুপের সৌন্দর্য বজায় রাখুন 🌸\n\n🐔🌬 আপনাকে আমাদের এই গ্রুপে আসার জন্য অনেক অনেক শুভেচ্ছা! 🎊🥰`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
