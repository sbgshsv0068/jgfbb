const axios = require("axios");

module.exports = {
  config: {
    name: "memberlist",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "MemberList",
    longDescription: "MemberList",
    category: "image",
    guide: "{pn}"
  },
  onStart: async function ({ api, event }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const participants = threadInfo.participantIDs;

      let message = `𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲: ${threadInfo.name}\𝗻𝗚𝗿𝗼𝘂𝗽 𝗜𝗗: ${event.threadID}\n`;

      for (const userId of participants) {
        const userProfile = await api.getUserInfo(userId);
        const username = userProfile[userId].name;
        message += `𝗨𝘀𝗲𝗿 𝗡𝗮𝗺𝗲: ${username}\n𝗨𝘀𝗲𝗿 𝗜𝗗: ${userId}\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};
