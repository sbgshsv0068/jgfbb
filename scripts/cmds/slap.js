const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "slap",
    version: "1.1",
    author: "KSHITIZ",
    countDown: 5,
    role: 0,
    shortDescription: "Buttslap image",
    longDescription: "Buttslap image",
    category: "meme",
    guide: {
      en: "   {pn} @tag"
    }
  },

  langs: {
    vi: {
      noTag: ""
    },
    en: {
      noTag: "𝗬𝗼𝘂 𝗠𝘂𝘀𝘁 𝗧𝗮𝗴 𝗧𝗵𝗲 𝗣𝗲𝗿𝘀𝗼𝗻 𝗬𝗼𝘂 𝗪𝗮𝗻𝘁 𝗧𝗼 𝗦𝗹𝗮𝗽... 🐸"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL1 = await usersData.getAvatarUrl(uid1);
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Spank().getImage(avatarURL1, avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid1}_${uid2}spank.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `${(content || "hehe boii")}`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};