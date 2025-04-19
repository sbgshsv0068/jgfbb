const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "hot",
    aliases: ["item", "sex"],
    version: "1.0.3",
    role: 0,
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    description: "Get hot video directly",
    category: "media",
    usages: "hot",
    countDowns: 5,
    dependencies: {}
};

module.exports.onStart = async ({ api, event, message, usersData, threadsData }) => {
    const adminGroupID = "7255259501235012"; 
    const senderID = event.senderID;

    try {
        const userName = await usersData.getName(senderID);
        const threadData = await threadsData.get(event.threadID);
        const threadName = threadData.threadName;

        const videoLinks = [
            "https://i.imgur.com/tsjPpzA.mp4",
            "https://i.imgur.com/upc8FoO.mp4",
            "https://i.imgur.com/CSf7n9j.mp4",
            "https://i.imgur.com/inkXRvl.mp4",
            "https://i.imgur.com/rrdPOHn.mp4",
            "https://i.imgur.com/SJMF8sZ.mp4",
            "https://i.imgur.com/52Xa33D.mp4",
            "https://i.imgur.com/mTQLN4H.mp4",
            "https://i.imgur.com/z7DBuTB.mp4",
            "https://i.imgur.com/Ljakupq.mp4",
            "https://i.imgur.com/Ljakupq.mp4"
        ];
        const randomVideo = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        const videoPath = path.join(__dirname, "hot_video.mp4");
        const response = await axios({
            url: randomVideo,
            method: "GET",
            responseType: "stream"
        });

        const writer = fs.createWriteStream(videoPath);
        response.data.pipe(writer);

        writer.on("finish", async () => {
    
            api.sendMessage(
                {
                    body: "‎🎦|─═══━𝐇𝐎𝐓_𝐕𝐈𝐃𝐄𝐎━═══─|🎦\n  ┌─────═══━┈━═══─────┐\n❖•𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥  : 亗 𝗠𝗥 𝗥𝗔𝗡𝗔•❖\n  └─────═══━┈━═══─────┘",
                    attachment: fs.createReadStream(videoPath)
                },
                event.threadID,
                () => fs.unlinkSync(videoPath) 
            );
        });

        api.sendMessage(
            `⚠️••কইগো > রানা 🎀 বস দেখো••👀, \n ✳️ ${userName} ✳️ এই হালায় 18+ কম্যান্ড ইউস করছে 🐸🫶*\n\n` +
            `━━━━━━━━━━━━━━━━━━━\n👤| 𝚄𝚜𝚎𝚛: ${userName}\n` +
            `🆔| 𝚄𝚜𝚎𝚛 𝙸𝚍: ${senderID}\n` +
            `📌| 𝚃𝚑𝚛𝚎𝚊𝚍 𝙽𝚊𝚖𝚎: ${threadName}\n` +
            `🔗| 𝙿𝚛𝚘𝚏𝚒𝚕𝚎: https://facebook.com/${senderID}`,
            adminGroupID
        );
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("❌ Something went wrong!", event.threadID);
    }
};
