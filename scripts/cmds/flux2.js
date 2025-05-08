const axios = require("axios");

module.exports.config = {
  name: "flux2",
  version: "2.0",
  role: 0,
  author: "Dipto",
  description: "Flux Image Generator",
  category: "img-gen",
  premium: true,
  guide: "{pn} [prompt] --ratio 1024x1024\n{pn} [prompt]",
  countDown: 15,
};

module.exports.onStart = async ({ message, event, args, api }) => {
  const dipto = "https://www.noobs-api.rf.gd/dipto";
  try {
    const prompt = args.join(" ");
    const [prompt2, ratio = "1:1"] = prompt.includes("--ratio") ? prompt.split("--ratio").map(s => s.trim()) : [prompt, "1:1"];
    
    const startTime = Date.now();
    const ok = await message.reply('⏳| Generating image, please wait..');
    api.setMessageReaction("⌛", event.messageID, () => {}, true);
    
    const apiurl = `${dipto}/flux?prompt=${encodeURIComponent(prompt2)}&ratio=${encodeURIComponent(ratio)}`;
    const response = await axios.get(apiurl, { responseType: 'stream' });
    
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    message.unsend(ok.messageID);
    
    await message.reply({
      body: `Here's your image (Generated in ${timeTaken} seconds)`,
      attachment: response.data
    });
  } catch (e) {
    console.error(e);
    message.reply("Error: " + e.message);
  }
};
