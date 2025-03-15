const axios = require("axios");

module.exports = {
  config: {
    name: "iptrack",
    aliases: ["trackip"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "IP Address Lookup",
    longDescription: "Find details about an IP address.",
    category: "Utility",
  },

  onStart: async function({ api, event, args }) {
    const timeStart = Date.now();

    if (!args[0]) {
      return api.sendMessage(
        "⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮𝗻 𝗜𝗣 𝗮𝗱𝗱𝗿𝗲𝘀𝘀 𝘁𝗼 𝗹𝗼𝗼𝗸𝘂𝗽.",
        event.threadID,
        event.messageID
      );
    }

    try {
      const { data: infoip } = await axios.get(
        `http://ip-api.com/json/${args.join(" ")}?fields=66846719`
      );

      if (infoip.status === "fail") {
        return api.sendMessage(
          `❌ 𝗘𝗿𝗿𝗼𝗿: ${infoip.message}. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.`,
          event.threadID,
          event.messageID
        );
      }

      const responseMessage = `🌍 *IP Address Lookup Result* 🌍
━━━━━━━━━━━━━━━━━━━
🕒 *Response Time:* ${(Date.now() - timeStart)}ms

📍 *Location Details:*
🗺️ *Continent:* ${infoip.continent}
🏳️ *Country:* ${infoip.country} (${infoip.countryCode})
🕋 *Region:* ${infoip.regionName} (${infoip.region})
🏙️ *City:* ${infoip.city}
🛣️ *District:* ${infoip.district}
📮 *ZIP Code:* ${infoip.zip}

🧭 *Coordinates:*
📍 *Latitude:* ${infoip.lat}
📍 *Longitude:* ${infoip.lon}

⏳ *Timezone:* ${infoip.timezone}
🏢 *Organization:* ${infoip.org}
💰 *Currency:* ${infoip.currency}
━━━━━━━━━━━━━━━━━━━`;

      api.sendMessage(
        {
          body: responseMessage,
          location: {
            latitude: infoip.lat,
            longitude: infoip.lon,
            current: true,
          },
        },
        event.threadID,
        event.messageID
      );
    } catch (error) {
      api.sendMessage(
        "❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱. 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.",
        event.threadID,
        event.messageID
      );
    }
  },
};
