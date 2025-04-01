const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"RB-BADOL-KHAN",// Convert By Goatbot Raja-Babu 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃•𝐑𝐀𝐍𝐀',
      gender: '𝐌𝐀𝐋𝐄',
      age: '𝟏𝟖+',
      height: '𝟓.𝟕',
      facebookLink: 'www.facebook.com/XAICO.RANA',
      messengerLink: 'm.me/XAICO.RANA',
      whatsappLink: 'wa.me/01988686406',
      nick: '𝐓𝐎𝐌'
    };

    const bold = 'https://i.imgur.com/aSvCogu.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
❮●❯━━━━━━❪𝐑•𝐁❫━━━━━━❮●❯️\n\n💛𝐎𝐖𝐍𝐄𝐑-𝐈𝐍𝐅𝐈𝐑𝐌𝐀𝐓𝐈𝐎𝐍:💛\n\n
𝐍𝐀𝐌𝐄: ${ownerInfo.name}\n
𝐍𝐈𝐂𝐊: ${ownerInfo.nick}\n
𝐆𝐄𝐍𝐃𝐄𝐑: ${ownerInfo.gender}\n
𝐀𝐆𝐄: ${ownerInfo.age}\n
𝐇𝐄𝐈𝐆𝐇𝐓: ${ownerInfo.height}\n
𝐅𝐁: ${ownerInfo.facebookLink}\n
𝐌𝐒𝐆: ${ownerInfo.messengerLink}\n
𝐖𝐏: ${ownerInfo.WhatsAppLink}\n
\n\n❮●❯━━━━━━❪𝐑•𝐁❫━━━━━━❮●❯
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
