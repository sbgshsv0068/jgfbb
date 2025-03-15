const axios = require('axios');

module.exports = {
  config: {
    name: "character",
    aliases: ["character","ctanime","ac"],
    version: "1.0",
    author: "binod",
    countDown: 5,
    role: 0,
    shortDescription: "get character data",
    longDescription: "search and get character infos",
    category: "anime",
    guide: "{pn} {{<name>}}"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`⚠️ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗔 𝗖𝗵𝗮𝗿𝗲𝗰𝘁𝗲𝗿 𝗡𝗮𝗺𝗲 `);
    else {
      const BASE_URL = `https://api.safone.tech/anime/character?query=${name}`;
      try {
        let res = await axios.get(BASE_URL)


        let res2 = res.data
        let nm = res2.name.full + " " + res2.name.native
        let gen = res2.gender
        let ag = res2.age
        let heit = res2.height
        let anim = res2.media.edges[0].node.title.romaji + " 🇯🇵 " + res2.media.edges[0].node.title.native
        let desc = res2.description
        let img = res2.image.large
        const form = {
          body: `===「 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿 𝗜𝗻𝗳𝗼 」===`
            + `\n\n👤 𝙽𝚊𝚖𝚎: ${nm}`
            + `\n🚻 𝙶𝚎𝚗𝚍𝚎𝚛: ${gen}`
            + `\n🗓️ 𝙰𝚐𝚎: ${ag}`
            + `\n👖 𝙷𝚎𝚒𝚐𝚑𝚝: ${heit}`
            + `\n\n📺 𝙰𝚗𝚒𝚖𝚎 & 𝙼𝚊𝚗𝚐𝚊: ${anim}`
            + `\n\n🔉 𝙳𝚎𝚜𝚌𝚛𝚒𝚘𝚝𝚒𝚘𝚗: ${desc}`

        };
        if (img)
          form.attachment = await global.utils.getStreamFromURL(img);
        message.reply(form);
      } catch (e) { message.reply(`something went wrong`) }

    }
  }
};
