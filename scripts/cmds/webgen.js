const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "webgen",
    aliases: ["website", "web"],
    version: "1.3",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "Generate HTML and send as file with loading effect",
    longDescription: "Generate HTML code using API, show loading, then send as .txt file",
    category: "ai",
    guide: "{pn} [type of website]\nexample: {pn} personal web page"
  },

  onStart: async function ({ args, message, api, event }) {
    const query = args.join(" ");
    if (!query) return message.reply("♻️| 𝘗𝘭𝘦𝘢𝘴𝘦 𝘛𝘺𝘱𝘦 𝘈 𝘞𝘦𝘣𝘴𝘪𝘵𝘦 𝘕𝘢𝘮𝘦. \n 𝘌𝘹𝘢𝘮𝘱𝘭𝘦 : 𝘱𝘦𝘳𝘴𝘰𝘯𝘢𝘭 𝘸𝘦𝘣 𝘱𝘢𝘨𝘦.");

    const loadingMessage = await message.reply("⏳|  𝘓𝘰𝘢𝘥𝘪𝘯𝘨 𝘠𝘰𝘶𝘳 𝘞𝘦𝘣𝘱𝘢𝘨𝘦...");

    const apiURL = `http://67.220.85.146:6482/api?tryp=text_to_code&text=${encodeURIComponent(query)}`;

    try {
      const res = await axios.get(apiURL);
      if (!res.data || typeof res.data !== 'string') {
        await api.unsendMessage(loadingMessage.messageID);
        return message.reply("🚫| 𝘚𝘰𝘮𝘵𝘩𝘪𝘯𝘨 𝘞𝘦𝘯𝘵 𝘞𝘳𝘰𝘯𝘨, 𝘗𝘭𝘦𝘢𝘴𝘦 𝘛𝘳𝘺 𝘈𝘨𝘢𝘪𝘯.");
      }

      const htmlCode = res.data.trim();
      const fileName = `webgen-${Date.now()}.txt`;
      const filePath = path.join(__dirname, "tmp", fileName);

      if (!fs.existsSync(path.join(__dirname, "tmp"))) {
        fs.mkdirSync(path.join(__dirname, "tmp"));
      }

      fs.writeFileSync(filePath, htmlCode);

      await api.unsendMessage(loadingMessage.messageID);

      message.reply({
        body: `𝘠𝘰𝘶𝘳 "${query}" 𝘏𝘛𝘔𝘓 𝘊𝘰𝘥𝘦 𝘏𝘢𝘳𝘦.. ☑️`,
        attachment: fs.createReadStream(filePath)
      }, () => {
        fs.unlinkSync(filePath); 
      });

    } catch (err) {
      console.error(err);
      await api.unsendMessage(loadingMessage.messageID);
      message.reply("🚫| 𝘚𝘰𝘮𝘵𝘩𝘪𝘯𝘨 𝘞𝘦𝘯𝘵 𝘞𝘳𝘰𝘯𝘨, 𝘗𝘭𝘦𝘢𝘴𝘦 𝘛𝘳𝘺 𝘈𝘨𝘢𝘪𝘯.");
    }
  }
};
