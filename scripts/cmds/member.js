const axios = require("axios");

module.exports = {
  config: {
    name: "member",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "Member",
    longDescription: "Member",
    category: "group",
    guide: "{pn}"
  },
  onStart: async function ({ api, event }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const participants = threadInfo.participantIDs;

      let message = `⛎| 𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲: ${threadInfo.name}\n🔹| 𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${event.threadID}\n`;

      for (const userId of participants) {
        const userProfile = await api.getUserInfo(userId);
        const username = userProfile[userId].name;
        message += `👨‍💻| 𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${username}\n🔹| 𝗨𝘀𝗲𝗿 𝗜𝗗: ${userId}\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};
