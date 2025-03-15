const fs = require('fs');

module.exports = {
  config: {
    name: "sendfile",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const per = global.GoatBot.config.GOD;
  if (!per.includes(event.senderID)) {
    api.sendMessage("𝗬𝗼𝘂 𝗗𝗼𝗻𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗧𝗼 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗠𝗗 𝗢𝗻𝗹𝘆 𝗠𝘆 𝗔𝗱𝗺𝗶𝗻 𝗖𝗮𝗻 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀. ❤️‍🩹", event.threadID, event.messageID);
    return;
  }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗙𝗶𝗹𝗲 𝗡𝗮𝗺𝗲 ❤️‍🩹.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝗙𝗶𝗹𝗲 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
