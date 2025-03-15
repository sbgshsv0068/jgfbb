module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "RANA", 
    countDown: 5,
    role: 0,
    shortDescription: "Admin & Info",
    longDescription: "Bot Owner Information",
    category: "auto",
  },

  onStart: async function ({ event, message, usersData, threadsData }) {
  
      // ইউজার ও থ্রেডের তথ্য সংগ্রহ
      const userData = await usersData.get(event.senderID);
      const userName = userData.name;

      const threadData = await threadsData.get(event.threadID);
      const threadName = threadData.threadName;

      // তারিখ ও সময় সংগ্রহ
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric", 
        month: "long", 
        day: "numeric"
      });

      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      // এডমিনের ছবি URL
      const adminImageURL = `https://graph.facebook.com/100063487970328/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      // মেসেজ টেমপ্লেট
      const infoMessage = `
╭──────────────────⊙
│  𝗔𝗦𝗦𝗔𝗟𝗔𝗠𝗨 𝗪𝗔𝗟𝗔𝗜𝗞𝗨𝗠  
│✨ 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ✨
│  
│ 📌 𝗡𝗔𝗠𝗘   : 𝗠𝗢𝗛𝗔𝗠𝗠𝗔𝗗 𝗥𝗔𝗡𝗔
│ 📍 𝗔𝗗𝗗𝗥𝗘𝗦𝗦 : 𝗥𝗔𝗡𝗚𝗣𝗨𝗥
│  
│ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧  
│ 🏷️ 𝗙𝗕  : 𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗥𝗮𝗻𝗮
│ 📢 𝗧𝗚  : t.me/xaico_rana
│  
│  🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢  
│ 🔰 𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫 : [ / ]
│ ⚡ 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 : 𝗥𝗔𝗡𝗔 𝗕𝗢𝗧 𝟬𝟬𝟳
│  
│ 🎭 𝗚𝗖 𝗡𝗔𝗠𝗘 : ${threadName}
│ ⏳ 𝗧𝗜𝗠𝗘 : ${formattedTime}  
│  
│ 🙏 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚  
╰──────────────────⊙`;

      // মেসেজ পাঠানো
      message.reply({
        body: infoMessage,
        attachment: await global.utils.getStreamFromURL(adminImageURL)
      });
  }
};
