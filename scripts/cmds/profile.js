module.exports = {
  config: {
    name: "profile",
    aliases: ["pp"],
    version: "1.1",
    author: "NIB",
    countDown: 5,
    role: 0,
    shortDescription: "PROFILE image",
    longDescription: "PROFILE image",
    category: "image",
    guide: {
      en: "   {pn} @tag"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "📌 𝗬𝗼𝘂 𝗠𝘂𝘀𝘁 𝗧𝗮𝗴 𝗧𝗵𝗲 𝗣𝗲𝗿𝘀𝗼𝗻 𝗧𝗵𝗮𝘁 𝗬𝗼𝘂 𝗪𝗮𝗻𝘁 𝗧𝗼 𝗚𝗲𝘁 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗣𝗶𝗰"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if(event.type == "message_reply"){
      avt = await usersData.getAvatarUrl(event.messageReply.senderID)
    } else{
      if (!uid2){avt =  await usersData.getAvatarUrl(uid1)
              } else{avt = await usersData.getAvatarUrl(uid2)}}


    message.reply({
      body:"𝗛𝗲𝗿𝗲 𝗬𝗼𝘂𝗿 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗣𝗶𝗰 ❤️‍🩹",
      attachment: await global.utils.getStreamFromURL(avt)
  })
  }
}; 
