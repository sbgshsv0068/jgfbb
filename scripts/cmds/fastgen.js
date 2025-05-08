const axios = require("axios");

exports.onStart = async function ({ message, args, event }) {
  let userMessage = args.join(" ").trim();

  if (!userMessage) {
    return message.reply("Please provide a prompt to generate the image.");
  }
  let aspectRatio = "16:9";
  
  const aspectRatioMatch = userMessage.match(/--ar\s*(\d+:\d+)/);

  if (aspectRatioMatch) {
  aspectRatio = aspectRatioMatch[1];
  userMessage = userMessage.replace(/--ar\s*\d+:\d+/, "").trim();
   }

  try {
    const imageLinks = [];

    for (let i = 0; i < 4; i++) {
      const response = await axios.get(`https://www.ai4chat.co/api/image/generate?prompt=${encodeURIComponent(userMessage)}&aspect_ratio=${encodeURIComponent(aspectRatio)}`);

      if (response.data.image_link) {
        imageLinks.push(response.data.image_link);
      } else {
        console.error(`Failed to generate image on attempt ${i + 1}`);
      }
    }

    if (imageLinks.length > 0) {
      const s = [];
      for (const l of imageLinks) {
          s.push(await utils.getStreamFromUrl(l));
      }
      message.reply({attachment:s});
    } else {
      message.reply("Failed to generate images. Please try again.");
    }
  } catch (error) {
    console.error("Image generation error:", error.message);
    message.reply("An error occurred while generating the images.");
  }
};

exports.config = {
    name: "fastgen",
    role: 2,
    category: "img-gen",
    countDown: 15,
    author: "Allou Mohamed",
    desc: "Fast gen imgs"
};
