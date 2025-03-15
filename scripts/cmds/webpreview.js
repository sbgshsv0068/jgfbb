module.exports = {
  config: {
    name: "webpreview",
    aliases: ['webview'],
    version: "1.1",
    author: "Samir Thakuri",
    coolDown: 5,
    role: 0,
    shortDescription: "See Website Info",
    longDescription: "Generate a detailed preview of a website's content",
    category: "Utility",
    guide: {
      en: "{pn} [URL]"
    },
  },
  onStart: async function ({ api, event, args }) {
  const url = args[0];
  
  const permission = global.GoatBot.config.GOD;
  
  if (!permission.includes(event.senderID)) {
    api.sendMessage("𝗬𝗼𝘂 𝗗𝗼𝗻𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗧𝗼 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 . 𝗢𝗻𝗹𝘆 𝗠𝘆 𝗔𝗱𝗺𝗶𝗻 𝗛𝗮𝘃𝗲 𝗔𝗰𝗰𝗲𝘀 ❤️‍🩹.", event.threadID, event.messageID);

  if (!url) {
    api.sendMessage("📌 𝗣𝗹𝗲𝗮𝘀𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗔 𝗨𝗥𝗟", event.threadID, event.messageID);
    return;
  }

  api.sendMessage(`🔍 𝗙𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗣𝗿𝗲𝘃𝗶𝗲𝘄 𝗙𝗼𝗿 "${url}"...`, event.threadID, event.messageID);

  try {
    const preview = await generateWebPreview(url);
    if (preview) {
      api.sendMessage({
        body: preview.text,
        attachment: fs.createReadStream(__dirname + "/cache/web_preview_image.jpg")
      }, event.threadID);
      
      if (preview.alternativeResults) {
        api.sendMessage(preview.alternativeResults, event.threadID);
      }
    } else {
      api.sendMessage("𝗡𝗼 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗙𝗼𝗿 𝗧𝗶𝘀 𝗨𝗥𝗟 .", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while generating the preview.", event.threadID, event.messageID);
  }
  
  async function generateWebPreview(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $("head title").text();
    const description = $("meta[name='description']").attr("content") || "";
    const imageUrl = $("meta[property='og:image']").attr("content") || "";

    const previewText = `
🌐 𝗣𝗿𝗲𝘃𝗶𝗲𝘄 𝗙𝗼𝗿 "${title}":

📜 𝗗𝗲𝘀𝗰𝗿𝗶𝗼𝘁𝗶𝗼𝗻: ${description}
🔗 𝗨𝗥𝗟: ${url}
🖼️ 𝗜𝗺𝗾𝗴𝗲 𝗨𝗿𝗹: ${imageUrl}
`;

    const apiResponse = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}`);
    const pages = apiResponse.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const pageData = pages[pageId];
    const extract = pageData.extract || "";

    let alternativeResults = "";

    if (extract) {
      const paragraphs = extract.split("\n\n").filter(para => para.length > 0);
      for (const paragraph of paragraphs) {
        alternativeResults += `\n\n${paragraph}\n\n`;
      }
    }

    let path = __dirname + "/cache/web_preview_image.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    if (!hasError) {
      return {
        text: previewText,
        alternativeResults: alternativeResults
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
    }
   }
  }
}
