const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");
const FormData = require('form-data');
 
module.exports.config = {
  name: "imgur",
  version: "6.9",
  author: "SK-SIDDIK-KHAN", 
  countDown: 5,
  role: 0,
  category: "upload",
  description: "convert image/video into Imgur link",
  usages: "reply [image, video]"
};
 
module.exports.onStart = async function ({ api, event }) {
  async function uploadToImgur(attachmentBuffer) {
    try {
      const formData = new FormData();
      formData.append('image', attachmentBuffer, 'image.jpg');
 
      console.log('𝗨𝗽𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗧𝗼 𝗜𝗺𝗴𝘂𝗿𝗲...');
      const uploadResponse = await axios.post('https://api.imgur.com/3/upload', formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Client-ID c76eb7edd1459f3`
        }
      });
 
      console.log('Upload response:', uploadResponse.data);
      const imgurLink = uploadResponse.data.data.link;
 
      if (!imgurLink) {
        throw new Error('Failed to get Imgur link');
      }
      return imgurLink;
 
    } catch (error) {
      console.error('Imgur upload error:', error.response?.data || error.message);
      throw new Error('An error occurred while uploading to Imgur.');
    }
  }
 
  try {
    const attachmentLink = event.messageReply?.attachments[0]?.url;
    if (!attachmentLink) {
      return api.sendMessage(
        "𝗣𝗹𝗲𝗮𝘀𝗲 𝗥𝗲𝗽𝗹𝘆 𝗧𝗼 𝗔𝗻 𝗜𝗺𝗮𝗴𝗲 𝗢𝗿 𝗩𝗶𝗱𝗲𝗼 ❤️‍🩹.",
        event.threadID,
        event.messageID
      );
    }
 
    const attachmentResponse = await axios.get(attachmentLink, { responseType: 'arraybuffer' });
    const attachmentBuffer = attachmentResponse.data;
    const imgurLink = await uploadToImgur(attachmentBuffer);
 
    api.sendMessage(imgurLink, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage(
      "𝗙𝗮𝗶𝗹𝗲𝗱 𝗧𝗼 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗜𝗺𝗮𝗴𝗲 𝗢𝗿 𝗩𝗶𝗱𝗿𝗼 𝗜𝗻𝘁𝗼 𝗟𝗶𝗻𝗸.",
      event.threadID,
      event.messageID
    );
  }
};
 const wrapper = new GoatWrapper(module.exports); wrapper.applyNoPrefix({ allowPrefix: true });
