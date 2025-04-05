const axios = require("axios");

module.exports = {
  config: {
    name: "scramble",
    aliases: ["wordgame", "unscramble"],
    version: "1.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    longDescription: { 
      en: "🔡 Unscramble the word and prove your vocabulary skills! 🏆" 
    },
    category: "game",
    guide: { 
      en: "⚡ 𝗧𝘆𝗽𝗲 **{p}{n}** 𝗧𝗼 𝗣𝗹𝗮𝘆!" 
    },
  },

  onStart: async function ({ message, event }) {
    try {
      const apiUrl = `https://random-word-api.herokuapp.com/word?number=1`;
      const response = await axios.get(apiUrl);
      const word = response.data[0];

      if (!word) return message.reply("❌ Failed to generate a word!");

      const scrambledWord = word.split("").sort(() => Math.random() - 0.5).join("");
      const timeoutDuration = 30000; // 30 seconds

      message.reply(
        `🔡 **𝗪𝗼𝗿𝗱 𝗦𝗰𝗿𝗮𝗺𝗯𝗹𝗲 𝗚𝗮𝗺𝗲** 🎯\n\n📢 **𝗨𝗻𝘀𝗰𝗿𝗮𝗺𝗯𝗹𝗲 𝗧𝗵𝗶𝘀 𝗪𝗼𝗿𝗱:** **${scrambledWord}**\n\n✨ 𝗥𝗲𝗽𝗹𝘆 𝗪𝗶𝘁𝗵 𝗧𝗵𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗪𝗼𝗿𝗱 (⏳ **𝗧𝗶𝗺𝗲: ${timeoutDuration / 1000} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀**)`,
        (err, info) => {
          if (!err) {
            const timeout = setTimeout(() => {
              if (global.GoatBot.onReply.has(info.messageID)) {
                message.unsend(info.messageID);
                global.GoatBot.onReply.delete(info.messageID);
                message.reply(`⏳ **𝙏𝙞𝙢𝙚'𝙨 𝙪𝙥!** ❌ 𝙔𝙤𝙪 𝙡𝙤𝙨𝙚** ❌ 𝗧𝗵𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗪𝗼𝗿𝗱 𝗪𝗮𝘀 : **${word}**`);
              }
            }, timeoutDuration);

            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              correctAnswer: word,
              timeout,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching the word:", error.message);
      message.reply("❌ Oops! Something went wrong!");
    }
  },

  onReply: async function ({ message, event }) {
    try {
      const userAnswer = event.body.trim().toLowerCase();
      const replyData = global.GoatBot.onReply.get(event.messageReply.messageID);

      if (!replyData || replyData.author !== event.senderID) return;

      const { correctAnswer } = replyData;

      message.unsend(event.messageReply.messageID);

      if (userAnswer === correctAnswer) {
        message.reply("🎉 **𝘾𝙊𝙍𝙍𝙀𝘾𝙏!** 🏆 𝙔𝙤𝙪 𝗨𝗻𝘀𝗰𝗿𝗮𝗺𝗯𝗹𝗲𝗱 𝗧𝗵𝗲 𝗪𝗼𝗿𝗱!");
      } else {
        message.reply(`❌ **𝙒𝙧𝙤𝙣𝙜!** 𝘽𝙚𝙩𝙩𝙚𝙧 𝙡𝙪𝙘𝙠 𝙣𝙚𝙭𝙩 𝙩𝙞𝙢𝙚!** 𝗧𝗵𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗪𝗼𝗿𝗱 𝗪𝗮𝘀 **${correctAnswer}**`);
      }

      global.GoatBot.onReply.delete(event.messageReply.messageID);
    } catch (error) {
      console.error("Error checking answer:", error.message);
      message.reply("⚠️ **Error!**");
    }
  },
};
