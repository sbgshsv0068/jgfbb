const axios = require('axios');

module.exports = {
  config: {
    name: "love",
    version: "1.0",
    author: "MR.AYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tính chỉ số tình cảm",
      en: "Calculate love compatibility"
    },
    longDescription: {
      vi: "Sử dụng lệnh này để tính chỉ số tình cảm giữa hai người.",
      en: "Use this command to calculate love compatibility between two people."
    },
    category: "fun",
    guide: {
      vi: "Cú pháp: love [tên người thứ nhất] - [tên người thứ hai]",
      en: "Syntax: love [first person's name] - [second person's name]"
    }
  },

onStart: async function ({ api, args, message, event }) {
    try {
      const text = args.join(" ");
      const [fname, sname] = text.split('-').map(name => name.trim());

      if (!fname || !sname) {
        return message.reply("❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗧𝗵𝗲 𝗡𝗮𝗺𝗲𝘀 𝗢𝗳 𝗕𝗼𝘁𝗵 𝗜𝗻𝗱𝗶𝘃𝗶𝗱𝘂𝗮𝗹𝘀.");
      }

      const response = await axios.get('https://love-calculator.api-host.repl.co/love-calculator', {
        params: { fname, sname }
      });

      const result = response.data;

      let loveMessage = `💖 𝗟𝗼𝘃𝗲 𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝘁𝘆 💖\n\n${fname} ❤️ ${sname}\n\n𝗣𝗲𝗿𝗰𝗲𝗻𝘁𝗮𝗴𝗲: ${result.percentage}%\n\n● ${result.result}\n`;

      const intervalMessages = {
        10: "Just the beginning! Keep exploring your feelings.",
        20: "There's potential here. Keep nurturing your connection.",
        30: "A solid foundation! Your love is growing.",
        40: "Halfway there! Your relationship is blossoming.",
        50: "A balanced and promising connection! Cherish your love.",
        60: "Growing stronger! Your bond is becoming more profound.",
        70: "On the right track to a lasting love! Keep building.",
        80: "Wow! You're a perfect match! Your love is extraordinary.",
        90: "Almost there! Your flame is burning brightly.",
        100: "Congratulations on a perfect connection! You two are meant to be!"
      };

      const interval = Math.floor(result.percentage / 10) * 10;
      const intervalMessage = intervalMessages[interval];

      if (intervalMessage) {
        loveMessage += `\n● ${intervalMessage} `;
      }

      message.reply(loveMessage);
    } catch (error) {
      console.error(error);
      message.reply("❌ An error occurred while calculating love compatibility. Please try again later.");
    }
  }
}; 
