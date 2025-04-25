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
    category: "box chat",
    guide: "{pn}"
  },
  onStart: async function ({ api, event }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const participants = threadInfo.participantIDs;

      let message = `‎┌─────── • ✧ • ──────┐\n⛎| 𝗚𝗰 𝗡𝗮𝗺𝗲: ${threadInfo.name}\n🔹| 𝗚𝗰 𝗜𝗗: ${event.threadID}‎\n‎└─────── •✧ • ──────┘\n\n`;

      for (const userId of participants) {
        const userProfile = await api.getUserInfo(userId);
        const username = userProfile[userId].name;
        message += `👤| 𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${username}\n🆔| 𝗨𝘀𝗲𝗿 𝗜𝗗: ${userId}\n───────────────────\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};
