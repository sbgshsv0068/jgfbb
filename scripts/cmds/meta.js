const axios = require('axios');
const fs = require('fs-extra');
module.exports={
config:{
  name: "meta",
    aliases: ["img5"],
    version: "6.9.0",
    author: "MR.AYAN",//** original MR.AYAN this is author fb I'd : https://m.me/NOOBS.DEVELOPER.AYAN but api dipto **//
    countDown: 15,
    role: 0,
    shortDescription: "photo genarate",
    longDescription: "Photo genarate from meta ai",
    category: "imagination",
    guide: {
      en: "{pn} [prompt]"
    }
},
onStart:async function ({ args, event, api }) {
  try {
    const apiUrl = "http://noobs-api.onrender.com";
    const prompt = args.join(" ");
    const wait = await api.sendMessage("   ...", event.threadID);
    const response = await axios.get(`${apiUrl}/dipto/meta?prompt=${encodeURIComponent(prompt)}&key=dipto008`);
    const data = response.data.imgUrls;
     await api.unsendMessage(wait.messageID);
    await api.sendMessage({
      body: `✅ | 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗬𝗼𝘂𝗿 𝗜𝗺𝗮𝗴𝗲𝘀`,
      attachment: await global.utils.getStreamFromURL(data)
    }, event.threadID ,event.messageID);
  } catch (e) {
    console.error(e);
    await api.sendMessage(`Failed to genarate photo!!!!\rror: ${e.message}`, event.threadID);
   }
 }
};
