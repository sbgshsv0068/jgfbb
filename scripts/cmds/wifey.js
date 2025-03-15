const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "wifey",
    aliases: ["shoti"],
    author: "RANA",
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: "Get random wifey ",
    longDescription: "Get random wifey video",
    category: "fun",
    guide: "{pn}",
  },

  onStart: async function ({ api, event, args, message }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);

    try {
      const response = await axios.get(`https://wifey-shoti.onrender.com/kshitiz`, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);

      const writer = fs.createWriteStream(tempVideoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: `𝗥𝗮𝗻𝗱𝗼𝗺 𝗪𝗶𝗳𝗲𝘆 𝗩𝗶𝗱𝗲𝗼𝘀 ❤️‍🩹.`,
          attachment: stream,
        });

        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred while processing your request.");
    }
  }
};
