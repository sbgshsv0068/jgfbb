const fs = require("fs");

module.exports = {
  config: {
    name: "math2",
    aliases: ["mathv2"],
    version: "6.2",
    author: "Anthony",
    description: "An interactive math game with multiple-choice questions, a leaderboard, won points, and a 40-second answer limit!",
    category: "Games",
    usages: "mathgame | mathgame leaderboard | mathgame wonpoints",
    cooldowns: 3
  },

  onStart: async function ({ event, api }) {
    const { threadID, senderID, body } = event;

    if (!global.GoatBot) global.GoatBot = {};
    if (!global.GoatBot.mathGame) global.GoatBot.mathGame = {};
    if (!global.GoatBot.leaderboard) global.GoatBot.leaderboard = {};
    if (!global.GoatBot.wonPoints) global.GoatBot.wonPoints = {};
    if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();
    if (!global.GoatBot.rounds) global.GoatBot.rounds = {};
    if (!global.GoatBot.timers) global.GoatBot.timers = {};

    if (!global.GoatBot.leaderboard[threadID]) global.GoatBot.leaderboard[threadID] = {};
    if (!global.GoatBot.wonPoints[threadID]) global.GoatBot.wonPoints[threadID] = 0;
    if (!global.GoatBot.rounds[threadID]) global.GoatBot.rounds[threadID] = 0;

    if (body.toLowerCase().includes("leaderboard")) {
      return this.sendLeaderboard({ api, threadID });
    } else if (body.toLowerCase().includes("wonpoints")) {
      return this.sendWonPoints({ api, threadID });
    }

    global.GoatBot.rounds[threadID] = 0;
    this.generateQuestion({ event, api });
  },

  generateQuestion: function ({ event, api }) {
    const { threadID, senderID } = event;

    if (global.GoatBot.rounds[threadID] >= 5) {
      api.sendMessage("🎉 𝗠𝗮𝘁𝗵 𝗚𝗮𝗺𝗲 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 𝗖𝗼𝗺𝗽𝗹𝘁𝗲𝗱! 𝗦𝘁𝗮𝗿𝘁 𝗔𝗴𝗮𝗶𝗻 𝗪𝗶𝘁𝗵 'math2'.", threadID);
      return;
    }

    const operations = ["+", "-", "*", "/"];
    let num1 = Math.floor(Math.random() * 50) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let operation = operations[Math.floor(Math.random() * operations.length)];
    let correctAnswer, options = [];

    switch (operation) {
      case "+": correctAnswer = num1 + num2; break;
      case "-": correctAnswer = num1 - num2; break;
      case "*": correctAnswer = num1 * num2; break;
      case "/": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
    }

    options.push(correctAnswer);
    while (options.length < 4) {
      let wrongAnswer = Math.floor(Math.random() * 100) + 1;
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    options.sort(() => Math.random() - 0.5);
    let correctIndex = options.indexOf(correctAnswer) + 1;

    api.getUserInfo(senderID, (err, data) => {
      if (err) return console.error("Error fetching user info:", err);
      const userName = data[senderID].name;

      api.sendMessage({
        body: `🧮 𝗦𝗼𝗹𝘃𝗲 𝗧𝗵𝗶𝘀 (Round ${global.GoatBot.rounds[threadID] + 1}/5):\n` +
          `${num1} ${operation} ${num2}\n` +
          options.map((opt, index) => `${index + 1}. ${opt}`).join("\n") +
          `\n\n𝗥𝗲𝗽𝗹𝘆 𝗪𝗶𝘁𝗵 𝗧𝗵𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗢𝗽𝘁𝗶𝗼𝗻 𝗡𝘂𝗺𝗯𝗲𝗿  (1-4).\n𝗢𝗻𝗹𝘆 @${userName} 𝗖𝗮𝗻 𝗔𝗻𝘀𝘄𝗲𝗿! (𝗬𝗼𝘂 𝗛𝗮𝘃𝗲**𝟰𝟬 𝘀𝗲𝗰𝗼𝗻𝗱𝘀**)`,
        mentions: [{ tag: userName, id: senderID }]
      }, threadID, (err, info) => {
        if (err) return console.error("Error sending message:", err);

        global.GoatBot.mathGame[threadID] = { correctIndex, options, senderID };
        global.GoatBot.onReply.set(info.messageID, { commandName: this.config.name, threadID, correctIndex });

        // Set a 40-second timer for the answer
        global.GoatBot.timers[threadID] = setTimeout(() => {
          if (global.GoatBot.mathGame[threadID]) {
            api.sendMessage("⏳ 𝗧𝗶𝗺𝗲'𝘀 𝗨𝗽! 𝗠𝗼𝘃𝗶𝗻𝗴 𝗧𝗼 𝗧𝗵𝗲 𝗡𝗲𝘅𝘁 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻...", threadID);
            delete global.GoatBot.mathGame[threadID];
            global.GoatBot.rounds[threadID] += 1;
            if (global.GoatBot.rounds[threadID] < 5) {
              this.generateQuestion({ event, api });
            } else {
              api.sendMessage("🎉 𝗠𝗮𝘁𝗵 𝗚𝗮𝗺𝗲 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱! 𝗦𝘁𝗮𝗿𝘁 𝗔𝗴𝗮𝗶𝗻 𝗪𝗶𝘁𝗵 'math2'.", threadID);
            }
          }
        }, 40000);
      });
    });
  },

  onReply: async function ({ event, api }) {
    const { body, threadID, senderID, messageID } = event;

    if (!global.GoatBot.mathGame[threadID]) {
      return api.sendMessage("❌ No active math game found.", threadID);
    }

    clearTimeout(global.GoatBot.timers[threadID]);

    const game = global.GoatBot.mathGame[threadID];
    const userAnswer = parseInt(body.trim());

    if (senderID !== game.senderID) {
      return api.sendMessage("❌ 𝗢𝗻𝗹𝘆 𝗧𝗵𝗲 𝗣𝗲𝗿𝘀𝗼𝗻 𝗪𝗵𝗼 𝗦𝘁𝗮𝗿𝘁𝗲𝗱 𝗧𝗵𝗲 𝗚𝗮𝗺𝗲 𝗖𝗮𝗻 𝗔𝗻𝘀𝘄𝗲𝗿..!", threadID);
    }

    if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 4) {
      return api.sendMessage("❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗜𝗻𝗽𝘂𝘁 𝗣𝗹𝗲𝗮𝘀𝗲 𝗦𝗲𝗹𝗲𝗰𝘁 𝗔𝗻 𝗢𝗽𝘁𝗶𝗼𝗻 𝗕𝗲𝘁𝘄𝗲𝗲𝗻 𝟭 𝗮𝗻𝗱 𝟰.", threadID);
    }

    api.getUserInfo(senderID, (err, data) => {
      if (err) return console.error("Error fetching user info:", err);
      const userName = data[senderID].name;

      if (userAnswer ==
