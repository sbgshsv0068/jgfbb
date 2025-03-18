const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "flux",
    author: "NZ R",
    version: "1.0",
    countDown: 10,
    role: 0,
    category: "ai-generated",
    guide: {
      en: "-flux <prompt> --<ratio>\n\nOptional ratios:\n\n--1 for 1:1\n--2 for 16:9\n--3 for 4:3\n--4 for 3:2\n--5 for 5:4\n--6 for 9:16\n--7 for 2:3\n--8 for 3:4\n--9 for 4:9\n\nExample: -flux 'your prompt' --1\n\n[FLUX Model Image Generations]"
    },
  },
  onStart: async ({ message: { reply: r, unsend }, args: a }) => {
    if (a.length === 0) return r("FLUX GENERATOR USAGE\n\n" + module.exports.config.guide.en);

    let pr = a.join(" ");
    if (!pr) return r("❌ | Please provide a query for image generation.");

    let ratios = ["1", "2"];
    let match = pr.match(/--(\d)$/);
    let ratio = match ? match[1] : ratios[Math.floor(Math.random() * ratios.length)];
    pr = pr.replace(/--\d$/, "").trim();

    const waitingMessage = await r("⏳ | Generating image... Please wait...");

    try {
      const imageResponse = await axios.get(`https://fluxpro-v3-by-nzr.onrender.com/fluxpro?prompt=${encodeURIComponent(pr)}&ratio=${encodeURIComponent(ratio)}`, {
        responseType: 'arraybuffer'
      });

      const tempFilePath = path.join(__dirname, `temp_${Date.now()}.jpg`);
      fs.writeFileSync(tempFilePath, Buffer.from(imageResponse.data));

      await unsend(waitingMessage.messageID);

      await r({
        body: "✅ | Generated",
        attachment: fs.createReadStream(tempFilePath)
      });

      fs.unlinkSync(tempFilePath);

    } catch (err) {
      await unsend(waitingMessage.messageID);
      return r(`❌ | Error: ${err.message}`);
    }
  }
};
