const axios = require('axios');

module.exports = {
  config: {
    name: "time",
    aliases: [],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "know the time zone of any city"
    },
    category: "info",
    guide: {
      en: "{p}{n} 𝗡𝗮𝗺𝗲 𝗢𝗳 𝗖𝗶𝘁𝘆"
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const cityName = args.join(' ');

    if (!cityName) {
      api.sendMessage("📌 𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗧𝗵𝗲 𝗡𝗮𝗺𝗲 𝗢𝗳 𝗧𝗵𝗲 𝗖𝗶𝘁𝘆.", event.threadID, event.messageID);
      return;
    }

   
    try {
      const apiKey = '0Hr3RnpBTgQvQ9np4ibDrQ==CkYJq9yAT5yk6vIn'; // add your own apikey
      const apiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${encodeURIComponent(cityName)}`;
      const response = await axios.get(apiUrl, { headers: { 'X-Api-Key': apiKey } });

    
      const { timezone, datetime, day_of_week, year, month } = response.data;

   
      const currentTime = datetime.split(' ')[1]; 
      const message = `𝗧𝗜𝗠𝗘 𝗭𝗢𝗡𝗘 𝗢𝗙: ${timezone}\n𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${currentTime}\n𝗬𝗘𝗔𝗥:${year}\n𝗠𝗢𝗡𝗧𝗛:${month}\n𝗗𝗔𝗬: ${day_of_week}`;
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
 
      api.sendMessage("Error fetching time information\nadd your own api key in code", event.threadID, event.messageID);
    }
  },
};

/*
in future if code stop working 
add your own apikey in code there is guide
you can get apikey from ninja pai web
*/
