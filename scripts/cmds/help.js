const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
 config: {
 name: "help",
 version: "1.18",
 author: "NTKhang | RANA",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "View command usage"
 },
 longDescription: {
 en: "View command usage"
 },
 category: "info",
 guide: {
 en: "{pn} [empty | <page number> | <command name>]"
 + "\n {pn} <command name> [-u | usage | -g | guide]: only show command usage"
 + "\n {pn} <command name> [-i | info]: only show command info"
 + "\n {pn} <command name> [-r | role]: only show command role"
 + "\n {pn} <command name> [-a | alias]: only show command alias"
 },
 priority: 1
 },

 langs: {
 en: {
 help: "╭━─━⊰ ✨ 𝗛𝗲𝗹𝗽 𝗠𝗲𝗻𝘂 ✨ ⊱━─━╮"
 + "\n%1"
 + "\n╰━─━⊰ 📜 𝗣𝗮𝗴𝗲 [ %2/%3 ] 📜 ⊱━─━╯"
 + "\n🌟 𝐂𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲, 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐇𝐚𝐬 %4 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬"
 + "\n🔹 𝐓𝐲𝐩𝐞 %5𝐡𝐞𝐥𝐩 <𝐩𝐚𝐠𝐞> 𝐓𝐨 𝐕𝐢𝐞𝐰 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬"
 + "\n🔹 𝐓𝐲𝐩𝐞 %5𝐡𝐞𝐥𝐩 <𝐜𝐨𝐦𝐦𝐚𝐧𝐝> 𝐓𝐨 𝐕𝐢𝐞𝐰 𝐃𝐞𝐭𝐚𝐢𝐥𝐬"
 + "\n💡 %6"
 + "\n╰━─━⊰ 🦋 𝐄𝐧𝐣𝐨𝐲! ⊱━─━╯",

 help2: "╭━─━⊰ 📜 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁 📜 ⊱━─━╮"
 + "\n✨ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:「%2」"
 + "\n╰━─━⊰ 🎯 ⊱━─━╯\n"
 + "╭━─━⊰ 🛠️ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 ⊱━─━╮\n%4\n╰━─━⊰ 🔥 𝗘𝗻𝗷𝗼𝘆! ⊱━─━╯",

 commandNotFound: "⚠️ Command \"%1\" does not exist! 🚫",
 getInfoCommand: "╭━─━⊰ 📖 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗜𝗻𝗳𝗼 📖 ⊱━─━╮"
 + "\n🔹 **Command:** %1"
 + "\n📌 **Description:** %2"
 + "\n🔀 **Aliases:** %3"
 + "\n🔖 **Group Aliases:** %4"
 + "\n📌 **Version:** %5"
 + "\n👤 **Role:** %6"
 + "\n⏳ **Cooldown:** %7s"
 + "\n✍️ **Author:** %8"
 + "\n📝 **Usage:** %9"
 + "\n╰━─━⊰ 🔥 𝗨𝘀𝗲 𝗪𝗶𝘀𝗲𝗹𝘆! ⊱━─━╯",

 onlyInfo: "╭━─━⊰ ℹ️ 𝗜𝗻𝗳𝗼 ⊱━─━╮"
 + "\n🔹 **Command:** %1"
 + "\n📌 **Description:** %2"
 + "\n🔀 **Aliases:** %3"
 + "\n🔖 **Group Aliases:** %4"
 + "\n📌 **Version:** %5"
 + "\n👤 **Role:** %6"
 + "\n⏳ **Cooldown:** %7s"
 + "\n✍️ **Author:** %8"
 + "\n╰━─━⊰ 🔥 𝗘𝗻𝗷𝗼𝘆! ⊱━─━╯",

 onlyUsage: "╭━─━⊰ 📜 𝗨𝘀𝗮𝗴𝗲 📜 ⊱━─━╮"
 + "\n📝 %1"
 + "\n╰━─━⊰ 🔥 𝗘𝗻𝗷𝗼𝘆! ⊱━─━╯",

 onlyAlias: "╭━─━⊰ 🔄 𝗔𝗹𝗶𝗮𝘀𝗲𝘀 🔄 ⊱━─━╮"
 + "\n🔀 **Aliases:** %1"
 + "\n🔖 **Group Aliases:** %2"
 + "\n╰━─━⊰ 🔥 𝗘𝗻𝗷𝗼𝘆! ⊱━─━╯",

 onlyRole: "╭━─━⊰ 👑 𝗥𝗼𝗹𝗲 👑 ⊱━─━╮"
 + "\n👤 %1"
 + "\n╰━─━⊰ 🔥 𝗘𝗻𝗷𝗼𝘆! ⊱━─━╯",

 doNotHave: "🚫 Not available",
 roleText0: "0️⃣ (All users)",
 roleText1: "1️⃣ (Group administrators)",
 roleText2: "2️⃣ (Bot admin)",
 roleText0setRole: "0️⃣ (Set role: All users)",
 roleText1setRole: "1️⃣ (Set role: Group admins)",
 pageNotFound: "❌ Page %1 does not exist!"
 }
}
};
