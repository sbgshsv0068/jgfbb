const axios = require("axios");
const moment = require("moment");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "github",
    aliases: ["git"],
    version: "1.0",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "Get GitHub user info",
    longDescription: {
      en: "Provides information of a GitHub user",
    },
    category: "info",
    guide: {
      en: "{pn} <username>",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (!args[0]) {
      return api.sendMessage("⚠️ Please provide a GitHub username.", event.threadID, event.messageID);
    }

    const username = encodeURIComponent(args.join(" "));
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      const user = res.data;

      const {
        login, avatar_url, name, id, html_url,
        public_repos, followers, following,
        location, created_at, updated_at, bio
      } = user;

      const info = 
`=== [ GITHUB INFO ] ===
━━━━━━━━━━━━━━━

📛 Name : ${name || "Not available"}
👤 Username : ${login}
🆔 ID: ${id}
🖥 Profile: ${html_url}
📂 Public Repos: ${public_repos}
🎀 Followers: ${followers}
🔖 Following: ${following}
🌍 Location: ${location || "Not available"}
📌 Created: ${moment.utc(created_at).format("MMMM Do YYYY")}
♻ Updated: ${moment.utc(updated_at).format("MMMM Do YYYY")}
💬 Bio: ${bio || "No bio"}`;

      const imagePath = __dirname + "/cache/github_avatar.png";
      const imageBuffer = (await axios.get(avatar_url, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

      api.sendMessage({
        body: info,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Couldn't find the GitHub user or an error occurred.", event.threadID, event.messageID);
    }
  }
};
