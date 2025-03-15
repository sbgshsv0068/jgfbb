const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "join",
    version: "2.0",
    author: "Kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "Join the group that bot is in",
    longDescription: "",
    category: "user",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        api.sendMessage('⚠️ **No group chats found.**\nYou need to be in some group chats to use this feature. Please try again after joining a group chat.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `🌟 **${index + 1}.** ${group.threadName}\n   ➡️ **𝗧𝗜𝗗:** ${group.threadID}`
        );
        const message = `╭───────────────╮\n│  **𝗝𝗼𝗶𝗻 𝗔 𝗚𝗿𝗼𝘂𝗽 𝗖𝗵𝗮𝗿𝘁**  \n│  📚 𝙷𝚊𝚛𝚎 𝙰 𝙻𝚒𝚜𝚝 𝙾𝚏 𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙶𝚛𝚘𝚞𝚙 𝙲𝚑𝚊𝚝𝚜:\n${formattedList.join("\n")}\n╰───────────────╯\n\n🎯 **𝚃𝚘 𝙹𝚘𝚒𝚗 𝙶𝚛𝚘𝚞𝚙, 𝚂𝚒𝚖𝚙𝚕𝚢 𝚁𝚎𝚙𝚕𝚢 𝚆𝚒𝚝𝚑 𝚃𝚑𝚎 𝙽𝚞𝚖𝚋𝚎𝚛 with 𝚃𝚑𝚎 𝙽𝚞𝚖𝚋𝚎𝚛 𝙾𝚏 𝚃𝚑𝚎 𝙶𝚛oup 𝚈𝚘𝚞 𝚆𝚊𝚗𝚝 𝚃𝚘 𝙹𝚘𝚒𝚗.**\n\n𝙴𝚡𝚊𝚖𝚙𝚕𝚎: \n\`𝚁𝚎𝚙𝚕𝚢 𝚆𝚒𝚝𝚑 1\` 𝚃𝚘 𝙹𝚘𝚒𝚗 𝚃𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝙶𝚛𝚘𝚞𝚙.`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'join',
          messageID: sentMessage.messageID,
          author: event.senderID,
        });
      }
    } catch (error) {
      console.error("Error listing group chats", error);
      api.sendMessage('❌ **Oops! Something went wrong while fetching the groups.**\nPlease try again later.', event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const groupIndex = parseInt(args[0], 10);

    if (isNaN(groupIndex) || groupIndex <= 0) {
      api.sendMessage('⚠️ **Invalid input.**\nPlease reply with a valid number corresponding to the group you want to join.\nFor example: **1** to join the first group.', event.threadID, event.messageID);
      return;
    }

    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (groupIndex > filteredList.length) {
        api.sendMessage('⚠️ **Invalid group number.**\nPlease reply with a number within the list range. For example, if you see 3 groups, choose a number between 1 and 3.', event.threadID, event.messageID);
        return;
      }

      const selectedGroup = filteredList[groupIndex - 1];
      const groupID = selectedGroup.threadID;

      await api.addUserToGroup(event.senderID, groupID);
      api.sendMessage(`🎉 **𝗦𝘂𝗰𝗰𝗲𝘀! 𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗝𝗼𝗶𝗻 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗽:**\n\n**${selectedGroup.threadName}**\n\n🎉 𝗘𝗻𝗷𝗼𝘆 𝗖𝗵𝗮𝘁𝗶𝗻𝗴 𝗔𝗻𝗱 𝗛𝗮𝘃𝗲 𝗙𝘂𝗻!`, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error joining group chat", error);
      api.sendMessage('❌ **An error occurred while adding you to the group.**\nPlease try again later.', event.threadID, event.messageID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};
