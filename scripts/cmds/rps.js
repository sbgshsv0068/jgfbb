module.exports = {
 config: {
 name: "rps",
 version: "1.0",
 author: "Loid",
 shortDescription: "Play rock-paper-scissors game with the bot.",
 category: "game",
 guide: "{prefix}rps <rock|paper|scissors>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["rock", "paper", "scissors"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice.toLowerCase())) {
 return message.reply("Please choose either rock, paper or scissors!");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`𝐘𝐨𝐮 𝐂𝐡𝐨𝐬𝐞 ${userChoice}. 𝐈 𝐂𝐡𝐨𝐬𝐞 ${botChoice}.`);

 if (userChoice.toLowerCase() === botChoice) {
 message.reply("𝐈𝐭'𝐬 𝐀 𝐓𝐢𝐞!");
 } else if (
 (userChoice.toLowerCase() === "rock" && botChoice === "scissors") ||
 (userChoice.toLowerCase() === "paper" && botChoice === "rock") ||
 (userChoice.toLowerCase() === "scissors" && botChoice === "paper")
 ) {
 message.reply("𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬, 𝐘𝐨𝐮 𝐖𝐨𝐧..!😗🎀");
 } else {
 message.reply("𝐈 𝐖𝐢𝐧, 𝐁𝐞𝐭𝐭𝐞𝐫 𝐋𝐮𝐜𝐤 𝐍𝐞𝐱𝐭 𝐓𝐢𝐦𝐞..!😗🎀");
 }
 },
};module.exports = {
 config: {
 name: "rps",
 version: "1.0",
 author: "RANA",
 shortDescription: "Play rock-paper-scissors game with the bot using emoji.",
 category: "fun",
 guide: "{prefix}rps <✊|✋|✌️>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["✊", "✋", "✌️"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice)) {
 return message.reply("𝘗𝘭𝘦𝘢𝘴𝘦 𝘊𝘩𝘰𝘰𝘴𝘦 𝘌𝘪𝘵𝘩𝘦𝘳 ✊, ✋, 𝘰𝘳 ✌️!");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`You chose ${userChoice}. I chose ${botChoice}.`);

 if (userChoice === botChoice) {
 message.reply("𝘐𝘵𝘴 𝘈 𝘛𝘪𝘦..!😗🎀! ⚖️");
 } else if (
 (userChoice === "✊" && botChoice === "✌️") ||
 (userChoice === "✋" && botChoice === "✊") ||
 (userChoice === "✌️" && botChoice === "✋")
 ) {
 message.reply("𝘊𝘰𝘯𝘨𝘳𝘢𝘵𝘶𝘭𝘢𝘵𝘪𝘰𝘯𝘴, 𝘠𝘰𝘶 𝘞𝘰𝘯..!😗🎀");
 } else {
 message.reply("𝘐 𝘞𝘪𝘯, 𝘉𝘦𝘵𝘵𝘦𝘳 𝘓𝘶𝘤𝘬 𝘕𝘦𝘹𝘵 𝘛𝘪𝘮𝘦..!😗🎀");
 }
 },
};
