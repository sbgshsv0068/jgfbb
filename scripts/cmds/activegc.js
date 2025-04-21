module.exports = {
  config: {
    name: "activegc",
    version: "1.0",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 2,
    shortDescription: "Join any group where the bot is/was added",
    longDescription: "List all groups (active or not) and join by replying the number",
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, threadsData, message, event }) {
    const allThreads = await threadsData.getAll();
    const allGroups = allThreads.filter(t => t.isGroup);
    
    if (allGroups.length === 0)
      return message.reply("No groups found where bot is/was added.");

    let msg = `💬 𝐀𝐜𝐭𝐢𝐯𝐞 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐬𝐭 (𝐓𝐨𝐭𝐚𝐥 ${allGroups.length})\n────────────────────\n\n`;
    let index = 1;
    global.joinGroupList = [];

    for (const thread of allGroups) {
      const name = thread.threadName || "Unnamed Group";
      msg += `${index}. ${name} \nTID: ${thread.threadID}\n────────────────────\n`;
      global.joinGroupList.push({ name, threadID: thread.threadID });
      index++;
    }

    msg += `\n➡️ Reply with the number of the group you want to join`;

    const reply = await message.reply(msg);
    global.GoatBot.onReply.set(reply.messageID, {
      commandName: 'joinall',
      messageID: reply.messageID,
      author: event.senderID
    });
  },

  onReply: async function ({ api, event, Reply }) {
    if (event.senderID !== Reply.author) return;

    const choice = parseInt(event.body);
    if (isNaN(choice) || choice < 1 || choice > global.joinGroupList.length)
      return api.sendMessage("❌ Invalid number. Please try again.", event.threadID);

    const group = global.joinGroupList[choice - 1];
    const info = await api.getThreadInfo(group.threadID);

    if (info.participantIDs.includes(event.senderID)) {
      return api.sendMessage(`⚠️ You're already in "${group.name}"`, event.threadID);
    }

    if (info.participantIDs.length >= 250) {
      return api.sendMessage(`❌ Cannot join "${group.name}". Group is full.`, event.threadID);
    }

    try {
      await api.addUserToGroup(event.senderID, group.threadID);
      api.sendMessage(`✅ Successfully added you to "${group.name}"`, event.threadID);
    } catch (err) {
      api.sendMessage("❌ Failed to add you. Maybe bot is not admin or user privacy blocked it.", event.threadID);
    }

    global.GoatBot.onReply.delete(event.messageID);
  }
};
