module.exports = {
  config: {
    name: "spy",
    version: "1.0",
    author: "Shikaki", //modified by RANA 😼
    countDown: 60,
    role: 0,
    shortDescription: "Get user information and avatar",
    longDescription: "Get user information and avatar by mentioning",
    category: "info",
  },

   onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {

      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
   
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "Girl";
          break;
        case 2:
          genderText = "Boy";
          break;
        default:
          genderText = "Unknown";
      }

      const userInformation = `╔══════════════╗\n   🎭  𝗨𝘀𝗲𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻\n╚══════════════╝\n\n🔹 𝗡𝗮𝗺𝗲: ${userInfo[uid].name}  \n🔹 𝗚𝗲𝗻𝗱𝗲𝗿: ${genderText}  \n🔹 𝗨𝘀𝗲𝗿 𝗧𝘆𝗽𝗲: ${userInfo[uid].type}  \n🔹 𝗙𝗿𝗶𝗲𝗻𝗱: ${userInfo[uid].isFriend ? "✅ Yes" : "❌ No"}  \n🔹 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗧𝗼𝗱𝗮𝘆: ${userInfo[uid].isBirthday ? "🎉 Yes" : "❌ No"}  \n🔹 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: (${userInfo[uid].profileUrl})  \n\n✨ Stay Connected!  `;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });
    });
  }
};
