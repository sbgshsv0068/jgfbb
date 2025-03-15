module.exports = {
	config: {
		name: "outall",
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		longDescription: {
			vi: "Leave All Chatbox In Bot Server",
			en: "Leave All Chatbox In Bot Server"
		},
		category: "owner"
 },
  onStart: async function({ message, event, api, commandName, threadsData, args, usersData }) {
     if (args[0]) {
       try { 
         const Tid = args[0] || event.threadID;
api.removeUserFromGroup(event.userID, Tid);
         message.reply('✅ | Done ✓');
       } catch (error) {
         return message.reply('😠 | error 😔');
       }
       return;
     } else {
    const t = await api.getThreadList(100, null, []);
    const tt = [];
    for (const thread of t) {
      const threadInfo = await threadsData.get(thread.threadID);
      if (threadInfo && threadInfo.members && threadInfo.isGroup && threadInfo.threadID != event.threadID) {
        const botMember = threadInfo.members.find(member => member.userID === event.userID && member.inGroup === true);
        if (botMember) {
          tt.push(thread.threadID);
        }
        if (tt.length == 0) {
          message.reply('✅ | No other groups founded the bot is only in this group');
          return;
        }
      }
    }
    await message.reply('📝 | 𝗙𝗼𝘂𝗻𝗱 ' + tt.length + ' 𝗚𝗿𝗼𝘂𝗽\n✅ | 𝗖𝗼𝗻𝗳𝗶𝗿𝗺 𝗢𝘂𝘁 𝗪𝗶𝘁𝗵 𝗥𝗲𝗮𝗰𝘁𝗶𝗼𝗻', (err, info) => {
        global.GoatBot.onReaction.set(info.messageID, {
        commandName: 'outall',
        author: event.senderID,
        mid: info.messageID,
        tt: tt,
      });
    });
   }
  },
onReaction: async function({ api, message, event, Reaction }) {
    async function removeUserFromGroup(userId, groupId) {
      let removedCount = 0;
      let errorCount = 0;
      try {
        await api.removeUserFromGroup(userId, groupId);
        removedCount++;
      } catch (error) {
        errorCount++;
      }
      return { removedCount, errorCount };
    }
    const { tt, author, mid, commandName } = Reaction;
    if (event.userID != author) return;
    message.reply('✅ | 𝗦𝘁𝗮𝗿𝘁 𝗢𝘂𝘁𝗶𝗻𝗴 𝗔𝗹𝗹 𝗚𝗿𝗼𝘂𝗼𝘀...');
    const BOT = api.getCurrentUserID();
    let totalRemovedCount = 0;
    let totalErrorCount = 0;
    for (const group of tt) {
      const result = await removeUserFromGroup(BOT, group);
      totalRemovedCount += result.removedCount;
      totalErrorCount += result.errorCount;
    }
    api.sendMessage(`✅ | 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗥𝗲𝗺𝗼𝘃𝗲𝗱 𝗙𝗿𝗼𝗺 ${totalRemovedCount} 𝗚𝗿𝗼𝘂𝗽𝘀.`, author);
    api.sendMessage(`❎ | Errors occurred in ${totalErrorCount} groups.`, author);
  }
};
