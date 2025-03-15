module.exports = {
  config: {
    name: "support",
    aliases: ["supportgc", "gc", "joingc"],
    version: "1.0",
    author: "MR.AYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add to Supportgc for admin support and approval" 
    },
    longDescription: { 
      en: "Join the support group chat"
    },
    category: "support",
    guide: {
      en: "{pn}"
     }
  },
  onStart: async function({ api, event }) {
    const supportGroupId = "7255259501235012";

    if (event.threadID === supportGroupId) {
      api.sendMessage("⚠ | 𝗬𝗼𝘂 𝗔𝗿𝗲 𝗔𝗹𝗿𝗲𝗮𝗱𝘆 𝗜𝗻 𝗧𝗵𝗲 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗚𝗿𝗼𝘂𝗽.", event.threadID);
    } else {
      try {
        await api.addUserToGroup(event.senderID, supportGroupId);
        api.sendMessage("✅ | 𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗕𝗲𝗲𝗻 𝗔𝗱𝗱𝗲𝗱 𝗧𝗼 𝗧𝗵𝗲 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 𝗚𝗿𝗼𝘂𝗽 .", event.threadID);
      } catch (error) {
        if (error.message === "Error: Add user to group: Action blocked") {
          api.sendMessage("❌ | 𝗦𝗼𝗿𝗿𝘆, 𝗬𝗼𝘂 𝗖𝗮𝗻'𝘁 𝗕𝗲 𝗔𝗱𝗱𝗲𝗱 𝗧𝗼 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗽 𝗕𝗲𝗰𝗮𝘂𝘀𝗲 𝗢𝗳 𝗚𝗿𝗼𝘂𝗽 𝗦𝗲𝘁𝘁𝗶𝗻𝘀.", event.threadID);
        } else {
          console.error(error);
          api.sendMessage("❌ | An error occurred while processing your request.", event.threadID);
        }
      }
    }
  }
};
