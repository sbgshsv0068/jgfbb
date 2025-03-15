module.exports = {
  config: {
    name: "fish",
    aliases: [],
    version: "1.0",
    author: "Aryan",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Fish command - win money",
      tl: "Fish command - manalo ng pera"
    },
    longDescription: {
      en: "Fish command - try your luck and win some money!",
      tl: "Fish command - subukan ang iyong kapalaran at manalo ng pera!"
    },
    category: "goatBot",
    guide: {
      en: "{p}fish",
      tl: "{p}fish"
    }
  },

  onStart: async function({ event, message, threadsData, usersData, api }) {
    const userId = event.senderID;
    const userData = await usersData.get(userId);
    const { name, money } = userData;

    const bet = 100; // Amount of money user needs to bet
    if (money < bet) {
      message.reply("𝗬𝗼𝘂 𝗗𝗼𝗻𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗠𝗼𝗻𝗲𝘆 𝗧𝗼 𝗣𝗹𝗮𝘆.");
      return;
    }

    const slotItems = ["🐟", "🐡", "🦑", "🦀", "🐠"];
    const result = [];

    for (let i = 0; i < 3; i++) {
      const itemIndex = Math.floor(Math.random() * slotItems.length);
      result.push(slotItems[itemIndex]);
    }

    const won = result.every((item) => item === result[0]);

    if (won) {
      const winnings = 500; // Amount of money user wins
      await usersData.set(userId, { name, money: money + winnings });
      message.reply(`𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗼𝗻𝘀! 𝗬𝗼𝘂 𝗪𝗼𝗻 ${winnings} 𝗠𝗼𝗻𝗲𝘆 🎉`);
    } else {
      await usersData.set(userId, { name, money: money - bet });
      message.reply(`𝗦𝗼𝗿𝗿𝘆, 𝗬𝗼𝘂 𝗟𝗼𝘀𝘁 ${bet} 𝗠𝗼𝗻𝗲𝘆. 𝗕𝗮𝘁𝘁𝗲𝗿 𝗟𝘂𝗰𝗸 𝗡𝗲𝘀𝘁 𝗧𝗶𝗺𝗲 😢`);
    }
  },
};
