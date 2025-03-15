const { getStreamsFromAttachment } = global.utils;

module.exports = {
  config: {
    name: "notice",
    aliases: ["announce", "notisend"],
    version: "1.5",
    author: "Samir Thakuri",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Send an important notice to all groups"
    },
    longDescription: {
      en: "Admins can use this command to send an important notification to all active groups."
    },
    category: "owner",
    guide: {
      en: "{pn} <your message>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingMessage: "⚠️ Please enter the message you want to send to all groups!",
      notification: "📢 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗡𝗢𝗧𝗜𝗖𝗘 📢",
      sendingNotification: "🚀 Sending notifications to %1 chat groups...",
      sentNotification: "✅ Successfully sent notifications to %1 groups!",
      errorSendingNotification: "❌ Failed to send notifications to %1 groups:\n%2"
    }
  },

  onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
    const { delayPerGroup } = envCommands[commandName];
    
    if (!args[0]) {
      return message.reply(getLang("missingMessage"));
    }

    // নোটিফিকেশন ফরম্যাট করা হচ্ছে
    const notificationMessage = `📢 ${getLang("notification")}\n━━━━━━━━━━━━━━\n${args.join(" ")}`;

    // ফাইল বা মিডিয়া সংযুক্ত করা হচ্ছে
    const formSend = {
      body: notificationMessage,
      attachment: await getStreamsFromAttachment(
        [
          ...event.attachments,
          ...(event.messageReply?.attachments || [])
        ].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
      )
    };

    // সক্রিয় গ্রুপের তালিকা সংগ্রহ করা
    const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.some(m => m.userID == api.getCurrentUserID()));

    message.reply(getLang("sendingNotification", allThreadID.length));

    let sendSuccess = 0;
    const sendError = [];
    const waitingSend = [];

    for (const thread of allThreadID) {
      const tid = thread.threadID;
      
      // নির্দিষ্ট গ্রুপ স্কিপ করা হচ্ছে
      if (tid === "1803867766392364" || tid === "5210270059035725") continue;

      try {
        waitingSend.push({
          threadID: tid,
          pending: api.sendMessage(formSend, tid)
        });
        await new Promise(resolve => setTimeout(resolve, delayPerGroup));
      } catch (e) {
        sendError.push(tid);
      }
    }

    // সব মেসেজ পাঠানো হয়েছে কিনা চেক করা
    for (const sent of waitingSend) {
      try {
        await sent.pending;
        sendSuccess++;
      } catch (e) {
        const { errorDescription } = e;
        if (!sendError.some(item => item.errorDescription == errorDescription)) {
          sendError.push({ threadIDs: [sent.threadID], errorDescription });
        } else {
          sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sent.threadID);
        }
      }
    }

    // ফাইনাল রিপোর্ট
    let msg = "";
    if (sendSuccess > 0) msg += `✅ ${getLang("sentNotification", sendSuccess)}\n`;
    if (sendError.length > 0) {
      msg += `❌ ${getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), 
        sendError.map(err => `\n - ${err.errorDescription}\n  + ${err.threadIDs.join("\n  + ")}`).join(""))}`;
    }
    
    message.reply(msg);
  }
};
