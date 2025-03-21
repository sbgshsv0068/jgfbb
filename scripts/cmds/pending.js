module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "RB-BADOL-KHAN",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "Goat-alAuthor"
  },

langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "╭━─━──━─━≪🟢🟡🔴⚪≫━──━─━─━╮ \n\n❤️🫶আপনার পেন্ডিং লিষ্টে মোট: %1 আছে🫶❤️ ❯\n\n━─━──━─━≪💛🤍💚💙💜❤️≫━──━─━─━\n\n%2\n\n╰━─━──━─━≪🟢🟡🔴⚪≫━──━─━─━╯",
        returnListClean: "「💚🫰আপনার পেন্ডিং লিষ্টে কোনো কিছুই নেই🫰💚」"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(`╭━─━──━─━≪🟢🟡🔴⚪≫━──━─━─━╮\n\n❤️🫶আপনাদের গ্রুপে Approved Done 🫶❤️\n\n💚🫶যে কোনো হেল্প এর জন্য বট এডমিন এর সাতে যোগাযোগ করুন🫶💚\n━─━──━─━≪𝐅𝐁×𝐌𝐄𝐒𝐒𝐄𝐍𝐆𝐀𝐑𝐄≫━──━─━─━\nhttps://www.facebook.com/XAICO.RANA\n\nm.me/100063487970328\n━─━──━─━≪💛🤍💚💙💜❤️≫━──━─━─━\n\n╰━─━──━─━≪🟢🟡🔴⚪≫━──━─━─━╯`, Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
  const { threadID, messageID } = event;

    var msg = "", index = 1;
 
    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
    var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
  } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

  const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
  }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
}
