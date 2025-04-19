module.exports = {
  config: {
    name: "fight",
    version: "1.0",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    category: "game",
    description: {
      en: "Emoji battle between two users"
    },
    guide: {
      en: "{pn} @user"
    }
  },

  onStart: async function ({ message, event, args }) {
    const { senderID, mentions } = event;

    if (!mentions || Object.keys(mentions).length !== 1)
      return message.reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘛𝘢𝘨 𝘖𝘯𝘦 𝘗𝘦𝘳𝘴𝘰𝘯..𝚈𝚘𝚞𝚛 𝙵𝚒𝚐𝚑𝚝 𝙴𝚖𝚘𝚓𝚒 𝙸𝚜..⚔️,🛡️,💥,🔥,🪓,🔫,🗡️,🥊");

    const targetID = Object.keys(mentions)[0];
    const fighter1 = senderID;
    const fighter2 = targetID;

    if (fighter1 === fighter2)
      return message.reply("You can't fight yourself!");

    const emojis = ["⚔️", "🛡️", "💥", "🔥", "🪓", "🔫", "🗡️", "🥊"];
    const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

    const battleLog = [
      `${randomEmoji()} Battle started between @${fighter1} and @${fighter2}!`,
      `${randomEmoji()} Both fighters are charging...`,
      `${randomEmoji()} Intense clash happening!`,
      `${randomEmoji()} Who will win...?`,
    ];

    const winner = Math.random() > 0.5 ? fighter1 : fighter2;

    for (let i = 0; i < battleLog.length; i++) {
      await new Promise(res => setTimeout(res, 1500));
      message.send(battleLog[i], null, {
        mentions: [
          { tag: `@${fighter1}`, id: fighter1 },
          { tag: `@${fighter2}`, id: fighter2 }
        ]
      });
    }

    await new Promise(res => setTimeout(res, 2000));
    return message.send(`🏆 𝘈𝘯𝘥 𝘛𝘩𝘦 𝘞𝘪𝘯𝘯𝘦𝘳 𝘐𝘴... @${winner}!`, null, {
      mentions: [{ tag: `@${winner}`, id: winner }]
    });
  }
};
