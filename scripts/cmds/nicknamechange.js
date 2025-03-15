module.exports = {
  config: {
    name: "nicknamechange",
    aliases: ["botnick", "nickchange"],
    version: "1.0",
    author: "Xemon",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    longDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    category: "owner",
    guide: {
      en: "{pn} <new nickname>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingNickname: "📌 𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗧𝗵𝗲 𝗡𝗲𝘄 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲 𝗙𝗼𝗿 𝗧𝗵𝗲 𝗕𝗼𝘁",
      changingNickname: "𝗦𝘁𝗮𝗿𝘁 𝗖𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝗕𝗼𝘁 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲 𝗧𝗼 '%1' 𝗜𝗻 %2 𝗚𝗿𝗼𝘂𝗽 𝗖𝗵𝗮𝘁𝘀",
      errorChangingNickname: "An error occurred while changing nickname in %1 groups:\%2",
      successMessage: "✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗖𝗵𝗮𝗻𝗴𝗲𝗱 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲 𝗜𝗻 𝗔𝗹𝗹 𝗚𝗿𝗼𝘂𝗽 𝗖𝗵𝗮𝘁𝘀 𝗧𝗼 '%1'",
      sendingNotification: "𝗦𝗲𝗻𝗱𝗶𝗻𝗴 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗧𝗼  %1 𝗚𝗿𝗼𝘂𝗽 𝗖𝗵𝗮𝘁𝘀."
    }
  },

  onStart: async function({ api, args, threadsData, message, getLang }) {
    function checkPermissionAndSendMessage(permission, message) {
  if (!permission.includes(event.senderID)) {
    api.sendMessage(message, event.threadID, event.messageID);
    return false;
  }
  return true;
}
    const GODPermission = global.GoatBot.config.GOD;
const vipUserPermission = global.GoatBot.config.vipUser;
const adminBotPermission = global.GoatBot.config.adminBot;

const permissionMessage = "You are not VIP user to use this cmd. Use /request to ask  permission for this cmd to authors";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

if (!checkPermissionAndSendMessage(vipUserPermission, permissionMessage)) {
  return;
}
if (!checkPermissionAndSendMessage(adminBotPermission, permissionMessage)) {
  return;
}
    const newNickname = args.join(" ");

    if (!newNickname) {
      return message.reply(getLang("invalidInput"));
    }

    const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
    const threadIds = allThreadID.map(thread => thread.threadID);

    const nicknameChangePromises = threadIds.map(async threadId => {
      try {
        await api.changeNickname(newNickname, threadId, api.getCurrentUserID());
        return threadId;
      } catch (error) {
        console.error(`Failed to change nickname for thread ${threadId}: ${error.message}`);
        return null;
      }
    });

    const failedThreads = (await Promise.allSettled(nicknameChangePromises))
      .filter(result => result.status === "rejected")
      .map(result => result.reason.message);

    if (failedThreads.length === 0) {
      message.reply(getLang("successMessage", newNickname));
    } else {
      message.reply(getLang("partialSuccessMessage", newNickname, failedThreads.join(", ")));
    }
    message.reply(getLang("sendingNotification", allThreadID.length));
  }
};
