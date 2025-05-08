const axios = require("axios");

module.exports = {
  config: {
    name: "meta",
    aliases: ["m"],
    version: "1.0",
    author: "RANA",
    description: "Ask anything to Meta AI",
    usage: "[question]",
    commandCategory: "ai",
    cooldowns: 3,
  },

  onStart: async function ({ message, args }) {
    const question = args.join(" ").trim();

    if (!question) {
      return message.reply("❗| 𝘗𝘭𝘦𝘢𝘴𝘦 𝘚𝘢𝘺 𝘚𝘰𝘮𝘵𝘩𝘪𝘯𝘨..\n 𝘌𝘹𝘢𝘮𝘱𝘭𝘦: /meta What is AI?");
    }

    const apiUrl = `https://01769e6f-aeb7-44fd-b73c-33b913e33db3-00-lxzwdjyp9k40.sisko.replit.dev/api/meta-ai?message=${encodeURIComponent(question)}`;

    try {
      const res = await axios.get(apiUrl);
      const { message: replyMsg, sources = [], media = [] } = res.data;

      let replyText = replyMsg?.trim() || "❗ কোনো উত্তর পাওয়া যায়নি।";

      const validSources = sources.filter(src => src.link && src.title);

      
      if (validSources.length > 0 || media.length > 0) {
        if (validSources.length > 0) {
          replyText += `\n\n🔗| Sources:\n${validSources
            .map((src, i) => `${i + 1}. [${src.title}](${src.link})`)
            .join("\n")}`;
        }

        if (media.length > 0) {
          replyText += `\n\n📎| Media:\n${media
            .map((m, i) => `${i + 1}. ${m}`)
            .join("\n")}`;
        }
      }

      return message.reply(replyText);
    } catch (error) {
      console.error("Meta AI error:", error.message);
      return message.reply("❌| 𝘚𝘰𝘳𝘳𝘺 𝘉𝘣𝘺 𝘚𝘰𝘮𝘵𝘩𝘪𝘯𝘨 𝘞𝘦𝘯𝘵 𝘞𝘳𝘰𝘯𝘨..।");
    }
  },
};
