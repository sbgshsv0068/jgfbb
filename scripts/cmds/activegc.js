const axios = require("axios");

module.exports = {
  config: {
    name: "activegc",
    version: "3.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 2,
    shortDescription: "Show all groups ever joined + join feature",
    longDescription: "Lists all groups the bot ever joined from DB, allows user to join via reply",
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ threadsData, api, event, message }) {
    try {
      const allThreads = await threadsData.getAll();
      const allGroups = allThreads.filter(t => t.isGroup);

      if (allGroups.length === 0)
        return message.reply("❌ No group found in the database where the bot was added.");

      let msg = `📂 𝐀𝐥𝐥 𝐆𝐫𝐨𝐮𝐩𝐬 𝐖𝐡𝐞𝐫𝐞 𝐁𝐨𝐭 𝐀𝐜𝐭𝐢𝐯𝐞 (𝐓𝐨𝐭𝐚𝐥: ${allGroups.length})\n────────────────────\n`;

      global.joinGroupData = [];

      for (let i = 0; i < allGroups.length; i++) {
        const group = allGroups[i];
        const name = group.threadName || "Unnamed Group";

        // Try fetching real-time member count
        let members = "Unknown";
        try {
          const info = await api.getThreadInfo(group.threadID);
          members = info.participantIDs.length;
        } catch (e) {
          // Group might not be accessible
        }

        msg += `${i + 1}. ${name}\nTID: ${group.threadID}\nMembers: ${members}\n────────────────────\n`;
        global.joinGroupData.push(group);
      }

      msg += "\n➡️ Reply with the number of the group you want to join.";
      const sent = await api.sendMessage(msg, event.threadID);
      global.GoatBot.onReply.set(sent.messageID, {
        commandName: "allg",
        messageID: sent.messageID,
        author: event.senderID
      });

    } catch (err) {
      console.error(err);
      api.sendMessage("❌ Error loading group list.", event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    if (event.senderID !== Reply.author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > global.joinGroupData.length) {
      return api.sendMessage("❌ Invalid number.", event.threadID);
    }

    const group = global.joinGroupData[index - 1];

    try {
      const info = await api.getThreadInfo(group.threadID);

      if (info.participantIDs.includes(event.senderID)) {
        return api.sendMessage(`⚠️ You're already in "${info.threadName || "Unnamed Group"}".`, event.threadID);
      }

      if (info.participantIDs.length >= 250) {
        return api.sendMessage(`❌ "${info.threadName || "Unnamed Group"}" is full.`, event.threadID);
      }

      await api.addUserToGroup(event.senderID, group.threadID);
      api.sendMessage(`✅ You've been added to "${info.threadName || "Unnamed Group"}".`, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("❌ Failed to add. Bot might not be admin or user's settings may block it.", event.threadID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  }
};
