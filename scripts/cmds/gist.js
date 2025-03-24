const axios = require("axios");
const fs = require("fs").promises;

module.exports = {
  config: {
    name: "gist",
    version: "1.1",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 2,
    role: 2,
    category: "owner",
    guide: {
      en: "{pn} create <text> | {pn} file <fileName> | {pn} enc <fileName>"
    }
  },

  onStart: async function ({ event, args, message, api }) {
    const permission = ["100063487970328"]; // Owner's ID

    if (!permission.includes(event.senderID)) {
      return message.reply("- তুমি এখনো বাচ্চা, এই কম্যান্ড ইউস করতে হলে বড়দের পারমিশন নিতে হয় 😼.");
    }

    const subCommand = args[0];

    try {
      if (subCommand === "create") {
        const content = args.slice(1).join(" ");
        if (!content) return message.reply("Please provide text to create a Gist.");

        const response = await createGist("gist.txt", content);
        return message.reply(`Gist Created: ${response}`);

      } else if (subCommand === "file") {
        const fileName = args[1];
        if (!fileName) return message.reply("Please provide a file name.");

        const filePath = `./scripts/cmds/${fileName}.js`;
        const data = await fs.readFile(filePath, "utf8");

        const response = await createGist(fileName, data);
        return message.reply(`𝐆𝐢𝐬𝐭 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐬𝐟𝐮𝐥𝐥𝐲 ☑️\n ${response}`);

      } else if (subCommand === "enc") {
        const fileName = args[1];
        if (!fileName) return message.reply("Please provide a file name to minify and upload.");

        const filePath = `./scripts/cmds/${fileName}.js`;
        const outputFilePath = `./scripts/cmds/${fileName}_min.js`;

        const { execSync } = require("child_process");
        execSync(`uglifyjs ${filePath} -o ${outputFilePath}`);

        const minifiedData = await fs.readFile(outputFilePath, "utf8");
        const response = await createGist(`${fileName}_min.js`, minifiedData);
        return message.reply(`Minified Gist Created: ${response}`);

      } else {
        return message.reply("Invalid command. Use: create | file <fileName> | enc <fileName>");
      }
    } catch (error) {
      console.error(error);
      return message.reply(`Error: ${error.message}`);
    }
  }
};

async function createGist(fileName, content) {
  try {
    const response = await axios.post("https://api.github.com/gists", {
      description: "Created via Bot",
      public: true,
      files: {
        [fileName]: { content }
      }
    }, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer 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`
      }
    });

    return response.data.html_url;
  } catch (error) {
    console.error("Failed to create Gist:", error);
    throw new Error("Failed to create Gist. Check logs for more details.");
  }
          }
