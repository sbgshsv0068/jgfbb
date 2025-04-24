const { getStreamFromURL } = global.utils;
module.exports = {
  config: {
    name: "pair2",
    version: "1.0",
    author: "RANA",
    shortDescription: {
      en: "pair with random people 😗",
      vi: ""
    },
    category: "love",
    guide: "{pn}"
  },

  onStart: async function({ event, threadsData, message, usersData }) {
    const uidI = event.senderID;
    const avatarUrl1 = await usersData.getAvatarUrl(uidI);
    const name1 = await usersData.getName(uidI);
    const threadData = await threadsData.get(event.threadID);
    const members = threadData.members.filter(member => member.inGroup);
    const senderGender = threadData.members.find(member => member.userID === uidI)?.gender;

    if (members.length === 0) return message.reply('There are no members in the group ☹️💕😢');

    const eligibleMembers = members.filter(member => member.gender !== senderGender);
    if (eligibleMembers.length === 0) return message.reply('There are no male/female members in the group ☹️💕😢');

    const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
    const randomMember = eligibleMembers[randomIndex];
    const name2 = await usersData.getName(`${randomMember.userID}`);
    const avatarUrl2 = await usersData.getAvatarUrl(`${randomMember.userID}`);
    const randomNumber1 = Math.floor(Math.random() * 36) + 65;
    const randomNumber2 = Math.floor(Math.random() * 36) + 65;

    message.reply({
      body: `‎┌─────── • ✧ • ──────┐
‎   🎀 𝐋𝐞𝐭𝐬 𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐞 🎀
‎   🎀 𝐓𝐡𝐞 𝐍𝐞𝐰 𝐂𝐨𝐮𝐩𝐥𝐞 🎀
‎└─────── • ✧ • ──────┘
‎
‎❤️ ${name1} 💕 ${name2} ❤️
‎💫 𝐀 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐌𝐚𝐭𝐜𝐡 𝐌𝐚𝐝𝐞 𝐈𝐧 𝐇𝐚𝐯𝐞𝐧  💫
‎
‎   𝗟𝗼𝘃𝗲 : ✨ "${randomNumber1} % 🤭"
‎   𝗥𝗮𝘁𝗶𝗼: 💖 "${randomNumber2} % 💕"
‎
‎ 𝚆𝚒𝚜𝚑𝚒𝚗𝚐 𝚈𝚘𝚞 𝙰  𝙻𝚒𝚏𝚎𝚝𝚒𝚖𝚎 𝙾𝚏 𝙻𝚘𝚟𝚎
‎ 𝙰𝚗𝚍 𝙴𝚗𝚍𝚕𝚎𝚜𝚜 𝙼𝚘𝚖𝚎𝚗𝚝𝚜 𝚃𝚘𝚐𝚎𝚝𝚑𝚎𝚛..🎀
‎
💌 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀, 𝗟𝗼𝘃𝗲𝗯𝗶𝗿𝗱𝘀! 💌
‎`,
      attachment: [
        await getStreamFromURL(`${avatarUrl1}`),
        await getStreamFromURL(`${avatarUrl2}`)
      ]
    });
  }
};
