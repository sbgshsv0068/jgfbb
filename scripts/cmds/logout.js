module.exports = {
  config: {
    name: "logout",
    version: "1.0",
    author: "Samir",
    countDown: 45,
    role: 0,
    shortDescription: "Logout Bot's Account",
    longDescription: "Logout Bot's Account",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function({ event, api }) {
const permission = global.GoatBot.config.GOD;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("𝗬𝗼𝘂 𝗗𝗼𝗻'𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗧𝗼 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀. 𝗢𝗻𝗹𝘆 𝗠𝘆 𝗔𝗱𝗺𝗶𝗻 𝗛𝗮𝘃𝗲 𝗔𝗰𝗰𝗲𝘀.", event.threadID, event.messageID);
    return;
  }
  api.sendMessage("𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗟𝗼𝗴𝗴𝗲𝗱 𝗢𝘂𝘁...", event.threadID, event.messageID);
  api.logout();
}
};
