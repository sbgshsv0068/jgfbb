const fs = require('fs');//please add music or video and move that all file inside scripts/cmdsnonprefix and replace that music name in the code or vdo if you want toset vdo just replace .mp3 with .mp4

module.exports = {
  config: {
    name: "gali",
    version: "1.0",
    author: "RB-BADOL-KHAN",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "sawya":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n\n🫶আমি মাদ্রাসায় পড়ি গালি পারিনা মাদারচোদ🫡🫰 ",
            attachment: fs.createReadStream("scripts/cmds/RANA/ohh.jpg"),
          });
          await api.setMessageReaction("🤬", event.messageID, event.threadID, api);
        break;
case "sawwa":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n\n🫶আমি মাদ্রাসায় পড়ি গালি পারিনা মাদারচোদ🫡🫰",
            attachment: fs.createReadStream("scripts/cmds/RANA/ohh.jpg"),
          });
          await api.setMessageReaction("😡", event.messageID, event.threadID, api);
   case "vuda":
          message.reply({
            body: "∘₊✧─────────────────✧₊∘\n\n🫶আমি মাদ্রাসায় পড়ি গালি পারিনা মাদারচোদ🫡🫰",
            attachment: fs.createReadStream("scripts/cmds/RANA/ohh.jpg"),
          });
          await api.setMessageReaction("😠", event.messageID, event.threadID, api);
case "magi":
          message.reply({
            body: " গালি দিলে পাপ হই বাইনচুদ 🫡🫰",
            attachment: fs.createReadStream("scripts/cmds/RANA/ohh.jpg"),
          });
          await api.setMessageReaction("👿", event.messageID, event.threadID, api);
  case "bal":
message.reply({
body: "🫶🫰আমি মাদ্রাসায় পড়ি এখানে গালাগালি করিস না মাদারচোদ🫤🫰",
            attachment: fs.createReadStream("scripts/cmds/RANA/ohh.jpg"),
          });
          await api.setMessageReaction("🫡", event.messageID, event.threadID, api);
   default:
          return;
      }
    }
  }
};
