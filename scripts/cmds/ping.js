 module.exports = {
  config: {
    name: "ping",
    Author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    version: "1.0",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Ping!"
    },
    longDescription: {
      en: "ðŸ”°Checking Bot's pingðŸ”°"
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();
    await api.sendMessage("♻️|𝗖𝗵𝗲𝗮𝗰𝗸𝗶𝗻𝗴 𝗕𝗼𝘁 𝗣𝗶𝗻𝗴..", event.threadID);
    const ping = Date.now() - timeStart;
    api.sendMessage(`[ ${ping}ms ]`, event.threadID);
  }
};
