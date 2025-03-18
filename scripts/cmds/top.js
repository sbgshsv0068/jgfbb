module.exports = {
  config: {
    name: "top",
    aliases: ["tp"],
    version: "1.0",
    author: "Anthony",
    role: 0,
    shortDescription: {
      en: "Top 30 Rich Users"
    },
    longDescription: {
      en: "Displays the top 30 richest users in terms of money with formatted values"
    },
    category: "group",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, args, message, event, usersData }) {
    function formatMoney(amount) {
      if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)} b`;
      if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)} m`;
      if (amount >= 1e3) return `${(amount / 1e3).toFixed(2)} k`;
      return amount.toString();
    }

    const allUsers = await usersData.getAll();
    const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 15);
    const topUsersList = topUsers.map(
      (user, index) => `${index + 1}. ${user.name}: ☞ ${formatMoney(user.money)} 💲`
    );
    const messageText = `📈 𝗧𝗼𝗽 𝟭𝟱 𝗥𝗶𝗰𝗵𝗲𝘀𝘁 𝗨𝘀𝗲𝗿𝘀 📈\n‎✨━━━━━━━━━━━━━━━━━✨\n${topUsersList.join('\n')}\n‎✨━━━━━━━━━━━━━━━━━✨\n♨️ 𝙺𝚎𝚎𝚙 𝚎𝚊𝚛𝚗𝚒𝚗𝚐 𝚝𝚘 𝚌𝚕𝚒𝚖𝚋 𝚝𝚑𝚎 𝚛𝚊𝚗𝚔𝚜♨️`;
    message.reply(messageText);
  }
};
