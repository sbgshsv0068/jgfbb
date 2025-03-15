const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "daily",
    version: "1.2",
    author: "NTKhang", 
    countDown: 5,
    role: 0,
    description: {
      vi: "Nhận quà hàng ngày 🎁",
      en: "Receive daily gift 🎁"
    },
    category: "game",
    guide: {
      vi: "{pn}: Nhận quà hàng ngày 🎉\n{pn} info: Xem thông tin quà hàng ngày 🏆",
      en: "{pn}: Receive daily gift 🎉\n{pn} info: View daily gift information 🏆"
    },
    envConfig: {
      rewardFirstDay: {
        coin: 100,
        exp: 10
      }
    }
  },

  langs: {
    vi: {
      monday: "Thứ 2 🗓️",
      tuesday: "Thứ 3 🗓️",
      wednesday: "Thứ 4 🗓️",
      thursday: "Thứ 5 🗓️",
      friday: "Thứ 6 🗓️",
      saturday: "Thứ 7 🗓️",
      sunday: "Chủ nhật 🗓️",
      alreadyReceived: "Bạn đã nhận quà rồi 🎁, quay lại ngày mai nhé! 😃",
      received: "Chúc mừng bạn! 🎉 Bạn đã nhận được %1 coin 💰 và %2 exp 🌟"
    },
    en: {
      monday: "𝗠𝗼𝗻𝗱𝗮𝘆 🗓️",
      tuesday: "𝗧𝘂𝗲𝘀𝗱𝗮𝘆 🗓️",
      wednesday: "𝗪𝗲𝗱𝗻𝗲𝘀𝘀𝗱𝗮𝘆 🗓️",
      thursday: "𝗧𝗵𝘂𝗿𝘀𝗱𝗮𝘆 🗓️",
      friday: "𝗙𝗿𝗶𝗱𝗮𝘆🗓️",
      saturday: "𝗦𝘁𝗮𝘂𝗿𝗱𝗮𝘆 🗓️",
      sunday: "𝗦𝘂𝗻𝗱𝗮𝘆 🗓️",
      alreadyReceived: "𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗔𝗹𝗿𝗲𝗮𝗱𝘆 𝗥𝗲𝗰𝗲𝗶𝘃𝗲𝗱 𝗬𝗼𝘂𝗿 𝗚𝗶𝗳𝘁  🎁, 𝗖𝗼𝗺𝗲 𝗕𝗮𝗰𝗸 𝗧𝗼𝗺𝗼𝗿𝗼𝘄! 😃",
      received: "𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀! 🎉 𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗥𝗲𝗰𝗲𝗶𝘃𝗲𝗱 %1 𝗖𝗼𝗶𝗻 💰 𝗔𝗻𝗱 %2 𝗘𝘅𝗽 🌟"
    }
  },

  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const reward = envCommands[commandName].rewardFirstDay;

    // Checking for info request
    if (args[0] === "info") {
      let msg = "🎁 **Thông tin quà hàng ngày:**\n"; // "Daily reward information"
      for (let i = 1; i < 8; i++) {
        const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i === 0 ? 7 : i) - 1));
        const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i === 0 ? 7 : i) - 1));
        const day = i === 7 ? getLang("𝗦𝘂𝗻𝗱𝗮𝘆") :
          i === 6 ? getLang("𝗦𝗮𝘁𝘂𝗿𝗱𝗮𝘆") :
          i === 5 ? getLang("𝗙𝗿𝗶𝗱𝗮𝘆") :
          i === 4 ? getLang("𝗧𝗵𝘂𝗿𝘀𝗱𝗮𝘆") :
          i === 3 ? getLang("𝗪𝗲𝗱𝗻𝗲𝘀𝘀𝗱𝗮𝘆") :
          i === 2 ? getLang("𝗧𝘂𝗲𝘀𝗱𝗮𝘆") :
          getLang("𝗠𝗼𝗻𝗱𝗮𝘆");
        msg += `🌟 **${day}:** ${getCoin} 𝗖𝗼𝗶𝗻 💰, ${getExp} 𝗘𝘅𝗽 🌟\n`;
      }
      return message.reply(msg);
    }

    const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
    const currentDay = new Date().getDay(); // Sunday = 0, Monday = 1, etc.
    const { senderID } = event;

    const userData = await usersData.get(senderID);

    // Checking if the user has already received their reward today
    if (userData.data.lastTimeGetReward === dateTime) {
      return message.reply(getLang("alreadyReceived"));
    }

    const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay === 0 ? 7 : currentDay) - 1));
    const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay === 0 ? 7 : currentDay) - 1));

    // Update user data with new rewards
    userData.data.lastTimeGetReward = dateTime;
    await usersData.set(senderID, {
      money: userData.money + getCoin,
      exp: userData.exp + getExp,
      data: userData.data
    });

    message.reply(getLang("received", getCoin, getExp));
  }
};
