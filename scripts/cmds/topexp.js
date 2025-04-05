module.exports = {
  config: {
    name: "topexp",
    version: "1.0",
    author: "Samir",
    role: 0,
    shortDescription: {
      en: "Top 10 Exp users"
    },
    longDescription: {
      en: "his module displays the top 10 users based on their exp points."
    },
    category: "top",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();
    
    // Filter out users with no experience points
    const usersWithExp = allUsers.filter(user => user.exp > 0);

    if (usersWithExp.length < 10) {
      message.reply("𝗧𝗵𝗲𝗿𝗲 𝗔𝗿𝗲 𝗡𝗼𝘁 𝗘𝗻𝗼𝘂𝗴𝗵 𝗨𝘀𝗲𝗿𝘀 𝗪𝗶𝘁𝗵 𝗘𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗲 𝗣𝗼𝗶𝗻𝘁𝘀 𝗧𝗼 𝗗𝗶𝘀𝗽𝗹𝗮𝘆 𝗔 𝗧𝗼𝗽 𝟭𝟬.");
      return;
    }
    
    const topExp = usersWithExp.sort((a, b) => b.exp - a.exp).slice(0, 10);
    
    const topUsersList = topExp.map((user, index) => `${index + 1}. ${user.name}: ${user.exp}`);
    
    const messageText = `📌 𝗧𝗼𝗽 𝟭𝟬 𝗥𝗮𝗻𝗸 𝗨𝘀𝗲𝗿:\n${topUsersList.join('\n')}`;
    
    message.reply(messageText);
  }
};
