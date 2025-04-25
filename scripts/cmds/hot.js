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
    category: "18+",
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
          "https://drive.google.com/uc?id=1a7XsNXizFTTlSD_gRQwK4bDA3HPam56W",
    "https://drive.google.com/uc?id=1aF6H24ILE6wIFGW3M3BGXg8l63ktP8B3",
    "https://drive.google.com/uc?id=1_ysGMbGZQexheta6tuSBhJQDeAMioXr_",
    "https://drive.google.com/uc?id=1bTwYfovA2YKCs_kskWyp2GHh7K9XHQN0",
    "https://drive.google.com/uc?id=1bPdkmq6lKm8BGwxkWaADHe0kutTtEujR",
    "https://drive.google.com/uc?id=1b_evUu8zmfiPs-CeaZp1DkkArB5zl5x-",
    "https://drive.google.com/uc?id=1brkBa03NdRCx6lfrjopbWJUCoJupCRYg",
    "https://drive.google.com/uc?id=1c6SCqToTZamfuiiz5LrckOxDYT9gnJGu",
    "https://drive.google.com/uc?id=1bv8GL0XDReocf1NfZBMCNoMAsBBwDE1i",
    "https://drive.google.com/uc?id=1c01XFZFNYRi_harhEbPvf-i25QIo9c0V",
    "https://drive.google.com/uc?id=1bs5sI8NDRVK_omefR59how1UjZ6TEu91",
    "https://drive.google.com/uc?id=1bcIoyM9T_wQlaXxar4nVjCXsKHavRmnb",
    "https://drive.google.com/uc?id=1boVaYpbxIH3RItPY6k0Ld2F98YasHVq9",
    "https://drive.google.com/uc?id=1c5YXcgK3kOx6bTfVjxNGGMdDYbGmVInC",
    "https://drive.google.com/uc?id=1c1OHfuq-YBOO-UwO5uybPqO7gOqTwInp",
    "https://drive.google.com/uc?id=1jsoQ4wuRdN6EP6jOE3C0L6trLZmoPI0L",
    "https://drive.google.com/uc?id=1jr4YzPNCTOj_lfdOSnauXfTPJkbuqS3f",
    "https://drive.google.com/uc?id=1tlon-avneE7lQF2rS13GOeiuLWIUEA7J",
    "https://drive.google.com/uc?id=1tqaCw0vfG2zJDijgsFF2UTlOB-EmI4SZ",
    "https://drive.google.com/uc?id=1ta1ujBjmcvxSuYVwQ3oEXIJsnPCW2VZO",
    "https://drive.google.com/uc?id=1svD1h3vEYbwxMeU5v4c2wQPBaU90fcEx",
    "https://drive.google.com/uc?id=1seUwXvoVFyCzOA5SykF9uxhlwuwLzPn0",
    "https://drive.google.com/uc?id=1t2oFQmOtw-6V_ahWzYo08v1g2oGnkhPL"
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
                    body: "‎🎦|─═══━𝟏𝟖+_𝐕𝐈𝐃𝐄𝐎━═══─|🎦",
                    attachment: fs.createReadStream(videoPath)
                },
                event.threadID,
                () => fs.unlinkSync(videoPath) 
            );
        });

        api.sendMessage(
            `‎⚠️••কইগো > রানা < বস দেখো••⚠️ \n\n 👉 ${userName} 👈 এই হালায় 18+ কম্যান্ড ইউস করছে 🐸🫶*\n\n‎মামলা নং : #42018 🗒️\nঅপরাধ : পবিত্রতা বিনষ্ট 🔞\nশাস্তির সুপারিশ : ঠেলা দিয়া রিমুভ বা ঠাণ্ডা ওয়ার্নিং ⚠️\n\n` +
            `━━━━━━━━━━━━━━━━━━━━\n👤| 𝚄𝚜𝚎𝚛: ${userName}\n` +
            `🆔| 𝚄𝚜𝚎𝚛 𝙸𝚍: ${senderID}\n` +
            `📌| 𝚃𝚑𝚛𝚎𝚊𝚍 : ${threadName}\n` +
            `🔗| 𝙿𝚛𝚘𝚏𝚒𝚕𝚎: https://facebook.com/${senderID}`,
            adminGroupID
        );
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("🥲 Something error baby", event.threadID);
    }
};
