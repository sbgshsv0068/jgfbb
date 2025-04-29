const axios = require("axios");

module.exports = {
  config: {
    name: "fflike",
    aliases: ["ffbost"],
    version: "1.2",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Send Free Fire UID to get likes"
    },
    longDescription: {
      en: "Free Fire UID like boosting using API"
    },
    category: "info",
    guide: {
      en: "{pn} [uid]"
    }
  },

  onStart: async function ({ message, args }) {
    const uid = args[0];

    if (!uid) {
      return message.reply("❌ | Please provide a Free Fire UID.\n\n Usage: /fflike 6835194660");
    }

    const apiUrl = `https://ff-like-six.vercel.app/fflike?uid=${uid}&server=bd&apikey=rahad2`;

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (data.success) {
        const playerName = data.data.PlayerNickname || "Unknown";
        const likesBefore = data.data.LikesbeforeCommand || 0;
        const likesAfter = data.data.LikesafterCommand || 0;
        const likesAdded = data.data.details.LikesGivenByAPI || 0;

        message.reply(
          `       ♻️•𝗟𝗶𝗸𝗲 𝗦𝗲𝗻𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆•♻️\n‎◆━━━━━━━━━━━━━━━━━◆\n` +
          `👤| 𝗡𝗮𝗺𝗲 : ${playerName}\n` +
          `🆔| 𝗨𝗜𝗗 : ${uid}\n` +
          `📈| 𝗟𝗶𝗸𝗲𝘀 𝗕𝗲𝗳𝗼𝗿𝗲 : ${likesBefore}\n` +
          `💹| 𝗟𝗶𝗸𝗲𝘀 𝗔𝗳𝘁𝗲𝗿 : ${likesAfter}\n` +
          `🔥| 𝗟𝗶𝗸𝗲𝘀 𝗚𝗶𝘃𝗲𝗻 : ${likesAdded}`
        );
      } else {
        message.reply(`❌ API Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(error);
      message.reply(`❌ API Request Failed: ${error.message}`);
    }
  }
};
