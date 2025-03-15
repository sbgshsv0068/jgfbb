const axios = require("axios");

module.exports = {
  config: {
    name: "roast",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Insult someone by using this cmd",
    category: "fun",
    guide: "{pn} @mention",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      if (mention.length !== 1) {
        api.sendMessage("📌 𝗣𝗹𝗲𝗮𝘀𝗲 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 𝗢𝗻𝗲 𝗣𝗲𝗿𝘀𝗼𝗻 𝗧𝗼 𝗜𝗻𝘀𝘂𝗹𝘁.", event.threadID);
        return;
      }

      const mentionName = event.mentions[mention[0]].replace("@", ""); 

      if (mentionName.toLowerCase().includes("kshitiz")) {//replace kshitiz with your name
        api.sendMessage("𝗛𝗮𝗵𝗛𝗮 𝗬𝗼𝘂 𝗖𝗮𝗻'𝘁 𝗜𝗻𝘀𝘂𝗹𝘁 𝗠𝘆 𝗢𝘄𝗻𝗲𝗿 😉 ", event.threadID);
        return;
      }

      const url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

      const response = await axios.get(url);
      const insult = response.data.insult;

      const insultMessage = `${mentionName}, ${insult}`;
      api.sendMessage(insultMessage, event.threadID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Error!", event.threadID);
    }
  },
};
