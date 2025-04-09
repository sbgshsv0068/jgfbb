const os = require("os");
const fs = require("fs-extra");

const startTime = new Date(); // Moved outside onStart

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up1"],
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 0,
    role: 0,
    category: "system",
    longDescription: {
      en: "Get System Information",
    },
  },

  onStart: async function ({ api, event, args, threadsData, usersData }) {
    try {
      const uptimeInSeconds = (new Date() - startTime) / 1000;

      const seconds = uptimeInSeconds;
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsLeft = Math.floor(seconds % 60);
      const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${secondsLeft}s`;

      const loadAverage = os.loadavg();
      const cpuUsage =
        os
          .cpus()
          .map((cpu) => cpu.times.user)
          .reduce((acc, curr) => acc + curr) / os.cpus().length;

      const totalMemoryGB = os.totalmem() / 1024 ** 3;
      const freeMemoryGB = os.freemem() / 1024 ** 3;
      const usedMemoryGB = totalMemoryGB - freeMemoryGB;

      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: "🔎| Retrieving system information... Please wait a moment...",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "⛔| 𝗕𝗔𝗗 𝗦𝗬𝗦𝗧𝗘𝗠";
      if (ping < 1000) {
        pingStatus = "✅| 𝗦𝗠𝗢𝗧𝗛 𝗦𝗬𝗦𝗧𝗘𝗠";
      }

      const systemInfo = `
✨ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢 ✨
╭─────────────────────⟡
│ 🖥️ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢
├─────────────────────⟡
│ ⏰ **𝚁𝚄𝙽 𝚃𝙸𝙼𝙴**: ${uptimeFormatted}
│ 🖥️ **𝙾𝚂**: ${os.type()} ${os.arch()}
│ 📚 **𝙻𝙰𝙽𝙶 𝚅𝙴𝚁**: ${process.version}
│ 🧑‍💻 **𝙲𝙿𝚄 𝙼𝙾𝙳𝙴𝙻**: ${os.cpus()[0].model}
│ 💾 **𝚂𝚃𝙾𝚁𝙰𝙶𝙴**: ${usedMemoryGB.toFixed(2)} GB / ${totalMemoryGB.toFixed(2)} GB
│ ⚡ **𝙲𝙿𝚄 𝚄𝚂𝙰𝙶𝙴**: ${cpuUsage.toFixed(1)}%
│ 🧠 **𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴**: ${process.memoryUsage().heapUsed / 1024 / 1024} MB
├─────────────────────⟡
│ ✅ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢
├─────────────────────⟡
│ 📅 **𝙳𝙰𝚃𝙴**: ${date}
│ 🕰️ **𝚃𝙸𝙼𝙴**: ${time}
│ 👥 **𝚄𝚂𝙴𝚁𝚂**: ${allUsers.length}
│ 🧵 **𝚃𝙷𝚁𝙴𝙰𝙳𝚂**: ${allThreads.length}
│ ⚡ **𝙿𝙸𝙽𝙶**: ${ping}ms
│ 💬 **𝚂𝚃𝙰𝚃𝚄𝚂**: ${pingStatus}
╰─────────────────────⟡

💡 **𝘔𝘖𝘙𝘌 𝘐𝘕𝘍𝘖**: 
- **𝘓𝘖𝘈𝘋 𝘈𝘝𝘌𝘙𝘈𝘎𝘌**: ${loadAverage[0]} | ${loadAverage[1]} | ${loadAverage[2]}
- **𝘍𝘙𝘙𝘌 𝘙𝘈𝘔**: ${freeMemoryGB.toFixed(2)} GB
`;

      api.sendMessage(
        {
          body: systemInfo,
        },
        event.threadID,
        (err, messageInfo) => {
          if (err) {
            console.error("Error sending message with attachment:", err);
          } else {
            console.log(
              "𝘔𝘈𝘚𝘚𝘈𝘎𝘌 𝘚𝘌𝘕𝘋 𝘚𝘜𝘊𝘊𝘌𝘚𝘍𝘜𝘓𝘓𝘠:",
              messageInfo,
            );
          }
        },
      );
    } catch (error) {
      console.error("Error retrieving system information:", error);
      api.sendMessage(
        "Unable to retrieve system information at this moment. Please try again later.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
