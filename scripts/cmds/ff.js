const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  config: {
    name: "ff",
    aliases: ["freefire", "stalkff"],
    version: "3.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "Get Free Fire player stats",
    longDescription: "Fetches Free Fire player stats and show equipped items in groups with images.",
    category: "info",
    guide: "{pn} [player_id]"
  },

  onStart: async function ({ message, args, api }) {
    const uid = args[0];
    if (!uid) return message.reply("Please provide the player ID.");

    const apiUrl = `https://for-devs.ddns.net/api/ffinfo?uid=${uid}&apikey=r-rishad100`;

    // Send loading message
    const loadingMessage = await message.reply("⏳| Fetching Free Fire player data...");

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data.accountInfo) {
        await api.unsendMessage(loadingMessage.messageID);
        return message.reply("No player found with this ID.");
      }

      const extract = (key) => {
        const match = data.accountInfo.match(new RegExp(`✔ ${key}: (.*?) \\n`));
        return match ? match[1] : "Not Found";
      };

      const playerInfo = `
      ‎         ♻️•𝗙𝗙 𝗜𝗡𝗙𝗢•♻️
‎◆━━━━━━━━━━━━━━━━━◆
👤| 𝗡𝗮𝗺𝗲: ${extract("Name")}
🆔| 𝗨𝗜𝗗: ${extract("UID")}
📈| 𝗟𝗲𝘃𝗲𝗹: ${extract("Level")}
🌍| 𝗥𝗲𝗴𝗶𝗼𝗻: ${extract("Region")}
🏆| 𝗕𝗥 𝗥𝗮𝗻𝗸: ${extract("Current BR Rank")}
🏅| 𝗕𝗥 𝗣𝗼𝗶𝗻𝘁𝘀: ${extract("BR Rank Point")}
⏰| 𝗟𝗮𝘀𝘁 𝗟𝗼𝗴𝗶𝗻: ${extract("Last Login")}
‎◆━━━━━━━━━━━━━━━━━◆
`;

      await api.unsendMessage(loadingMessage.messageID);
      await message.reply(playerInfo);

      // Function to create collage from images
      const createCollage = async (images) => {
        const imgList = await Promise.all(images.map(url => loadImage(url)));
        const canvas = createCanvas(300 * imgList.length, 300);
        const ctx = canvas.getContext('2d');

        imgList.forEach((img, index) => {
          ctx.drawImage(img, 300 * index, 0, 300, 300);
        });

        const buffer = canvas.toBuffer();
        const filePath = path.join(__dirname, `${Date.now()}.png`);
        fs.writeFileSync(filePath, buffer);
        return filePath;
      };

      // Categorize images
      const categories = {};
      for (const category of data.equippedItems) {
        const type = category.type;
        if (!categories[type]) categories[type] = [];
        for (const item of category.items) {
          categories[type].push(item.image);
        }
      }

      // Create and send collages
      for (const [type, images] of Object.entries(categories)) {
        if (images.length > 0) {
          const collagePath = await createCollage(images);
          await message.reply({
            body: `🖼️ **${type} 𝐈𝐭𝐞𝐦𝐬**`,
            attachment: fs.createReadStream(collagePath)
          });
          fs.unlinkSync(collagePath); // Clean up
        }
      }

    } catch (e) {
      console.error(e);
      await api.unsendMessage(loadingMessage.messageID);
      message.reply("An error occurred while fetching player data.");
    }
  }
};
