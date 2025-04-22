const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "islam",
    aliases: ["islamic"],
    version: "1.0.3",
    role: 0,
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    description: "Get hot video directly",
    category: "video",
    usages: "islam",
    cooldown: 5,
  },

  onStart: async function ({ message }) {
    const videoLinks = [
      "https://drive.google.com/uc?id=1Zl_I96I_ItJMCO2tTjzKypH2hgv5bbmD",
      "https://drive.google.com/uc?id=1Zl0IyIK_hWvtDip1UW4kHcg9EuAGQdmZ",
      "https://drive.google.com/uc?id=1ZhtkY8ZQI3cybm_GSv7aSTC--Mx3aB2p",
      "https://drive.google.com/uc?id=1ZoHlB4898wKgfs9OEGBRdwOFVc2YhZW6",
      "https://drive.google.com/uc?id=1Zwg90Uest4IQViMiQB5bRYq5jJwitC6L",
      "https://drive.google.com/uc?id=1_8QKHZCblDgSwgYVx36h4P4v5gdrdGDZ",
      "https://drive.google.com/uc?id=1_BfZZxhimqFy70nNj7TFFLe6jH49cKVW",
      "https://drive.google.com/uc?id=1_KEz-3u7vP5sPFHsGNdfLsNoWP0aBatP",
      "https://drive.google.com/uc?id=1_PI6gtf-E0jrYv8n-k1s9YpsIC2AYxrk",
      "https://drive.google.com/uc?id=1aP50As3s7g4589WjuDjQs6n-8fw3RnRJ",
      "https://drive.google.com/uc?id=1agG9tp4pV0df0yK67DeKXr4imk8Cg3DH",
      "https://drive.google.com/uc?id=1qvT2dwO7dytupRRQcUdhDfHbqTFR21JI",
      "https://drive.google.com/uc?id=1qi_iL6FB_OVBVYw3HAWvnQgXBGtRrUO1",
      "https://drive.google.com/uc?id=1qspziP8dW7ksRvykkekZPZlFyLpGTeB5",
      "https://drive.google.com/uc?id=1qYDNiNGDw05GMEnffAx-wzAkNvB135Xv",
      "https://drive.google.com/uc?id=1qv8PRCjaTydXkILuZy5HUyI6wW4jtOW5",
      "https://drive.google.com/uc?id=1qkU11Pz0YM5YnkJUnqDj9l7o0Pk6LnO5",
      "https://drive.google.com/uc?id=1qZGJGq5dOLDPDB1H8TqC0RBi4X9zCFER",
      "https://drive.google.com/uc?id=1qx6DrMFbKl4j4e4BmkSZPjPe5HJX0aKF",
      "https://drive.google.com/uc?id=1qRWCfHjp-q2v73cqAhuKkmecrC4DWry",
      "https://drive.google.com/uc?id=1qwhnM75GeoKroHP2c1NOWcaUKlgIQUab"
    ];

    const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];
    const videoPath = path.join(__dirname, "hot_video.mp4");

    try {
      const response = await axios({
        url: randomVideo,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(videoPath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        message.reply({
          body: "𝘏𝘢𝘳𝘦 𝘠𝘰𝘶𝘳 𝘐𝘴𝘭𝘢𝘮𝘪𝘤 𝘝𝘪𝘥𝘦𝘰.. 🎀",
          attachment: fs.createReadStream(videoPath)
        }, () => fs.unlinkSync(videoPath));
      });

      writer.on("error", (err) => {
        console.error("Writer error:", err);
        message.reply("Something went wrong while saving the video.");
      });

    } catch (error) {
      console.error("Download error:", error);
      message.reply("🥲 Something error baby");
    }
  }
};
