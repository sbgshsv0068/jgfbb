let messageCounts = {};
let spamDetectionEnabled = false;
const spamThreshold = 5;
const spamInterval = 120;

module.exports = {
	config: {
		name: "spamkick",
		aliases: ["autokick"],
		version: "1.0",
		author: "Jonnel and Blue",
    role: 2,
    category: "goatbot"
	},

	toggleSpamDetection: function () {
		spamDetectionEnabled = !spamDetectionEnabled;
		return spamDetectionEnabled ? "🟢 𝗦𝗽𝗮𝗺 𝗗𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗜𝘀 𝗡𝗼𝘄 𝗘𝗻𝗮𝗯𝗹𝗲𝗱 ." : "🔴 𝗦𝗽𝗮𝗺 𝗗𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗜𝘀 𝗡𝗼𝘄 𝗗𝗶𝘀𝗮𝗯𝗹𝗲𝗱.";
	},

	onStart: function ({ api, event }) {
		const { threadID, senderID, isAdmin } = event;

		if (!spamDetectionEnabled) {
			return;
		}

		if (!messageCounts[threadID]) {
			messageCounts[threadID] = {};
		}

		if (!messageCounts[threadID][senderID]) {
			messageCounts[threadID][senderID] = {
				count: 1,
				timer: setTimeout(() => {
					delete messageCounts[threadID][senderID];
				}, spamInterval),
			};
		} else {
			messageCounts[threadID][senderID].count++;
			if (messageCounts[threadID][senderID].count > spamThreshold) {
				if (isAdmin) {
					api.removeUserFromGroup(senderID, threadID);
					api.sendMessage({
						body: "🛡️ | 𝗗𝗲𝘁𝗲𝗰𝘁𝗲𝗱 𝗦𝗽𝗮𝗺𝗺𝗶𝗻𝗴. 𝗧𝗵𝗲 𝗨𝘀𝗲𝗿 𝗛𝗮𝘀 𝗕𝗲𝗲𝗯 𝗞𝗶𝗰𝗸𝗲𝗱 𝗙𝗿𝗼𝗺 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗽.",
						mentions: [{
							tag: senderID,
							id: senderID,
						}],
					}, threadID);
				} else {
					api.removeUserFromGroup(api.getCurrentUserID(), threadID);
					api.sendMessage("🛡️ | 𝗗𝗲𝘁𝗲𝗰𝘁𝗲𝗱 𝗦𝗽𝗮𝗺𝗺𝗶𝗻𝗴. 𝗧𝗵𝗲 𝗕𝗼𝘁 𝗛𝗮𝘀 𝗟𝗲𝗳𝘁 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗽 𝗗𝘂𝗲 𝗧𝗼 𝗦𝗽𝗮𝗺 .", threadID);
				}
			}
		}
	}
};


// gagana bato eh di naman ako nka goat bala na kayo na mag ayos goat user  or pa update if work practhvvice lang
