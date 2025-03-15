module.exports = {
  config: {
    name: "delate",
    aliases: ["dlt"],
    author: "RANA",
role: 2,
    category: "system"
  },
 
  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');
 
    const fileName = args[0];
 
    if (!fileName) {
      api.sendMessage("📌 𝗣𝗹𝗲𝗮𝘀𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗙𝗶𝗹𝗲 𝗡𝗮𝗺𝗲 𝗧𝗼 𝗗𝗲𝗹𝗲𝘁𝗲 .", event.threadID);
      return;
    }
 
    const filePath = path.join(__dirname, fileName);
 
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        api.sendMessage(`❎ 𝗙𝗮𝗶𝗹𝗱 𝗧𝗼 𝗗𝗲𝗹𝗲𝘁𝗲 ${fileName}.`, event.threadID);
        return;
      }
      api.sendMessage(`✅  ${fileName}  𝗗𝗲𝗹𝗲𝘁𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆`, event.threadID);
    });
  }
};
