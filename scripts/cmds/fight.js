const TIMEOUT_SECONDS = 120; // গেম টাইমআউট (সেকেন্ড)

// **অবস্থা ট্র্যাক করার জন্য দুইটি Map ব্যবহার করা হয়েছে**
const ongoingFights = new Map(); // চলমান ফাইট ট্র্যাক করতে
const gameInstances = new Map(); // গেম ইনস্ট্যান্স সংরক্ষণ করতে

module.exports = {
  config: {
    name: "fight",
    version: "1.0",
    author: "Shikaki",
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Fight with your friends!",
    },
    longDescription: {
      vi: "",
      en: "Challenge your friends to a fight and see who wins!",
    },
    category: "🎮 Game",
    guide: "{prefix}fight @mention",
  },

  onStart: async function ({ event, message, api, usersData, args }) {
    const threadID = event.threadID;

    // **যদি ইতিমধ্যেই ফাইট চলমান থাকে**
    if (ongoingFights.has(threadID)) {
      return message.send("⚔️ এই গ্রুপে ইতিমধ্যেই একটি ফাইট চলছে!");
    }

    // **একজন প্রতিপক্ষ উল্লেখ করা হয়েছে কিনা তা যাচাই করুন**
    const mention = Object.keys(event.mentions);
    if (mention.length !== 1) {
      return message.send("🤔 দয়া করে একজন ব্যক্তিকে মেনশন করুন ফাইট শুরু করতে!");
    }

    // **ফাইটের জন্য প্লেয়ার সেটআপ করুন**
    const challengerID = event.senderID;
    const opponentID = mention[0];

    const challenger = await usersData.getName(challengerID);
    const opponent = await usersData.getName(opponentID);

    // **ফাইট অবজেক্ট তৈরি করুন**
    const fight = {
      participants: [
        { id: challengerID, name: challenger, hp: 100 },
        { id: opponentID, name: opponent, hp: 100 },
      ],
      currentPlayer: Math.random() < 0.5 ? challengerID : opponentID, // র‍্যান্ডম প্রথম প্লেয়ার নির্ধারণ
      threadID: threadID,
      startTime: null,
    };

    // **গেম ইনস্ট্যান্স সংরক্ষণ করুন**
    gameInstances.set(threadID, {
      fight: fight,
      lastAttack: null,
      lastPlayer: null,
      timeoutID: null,
      turnMessageSent: false,
    });

    // **ফাইট শুরু করুন**
    startFight(message, fight);
    startTimeout(threadID, message);
  },

  // **🔄 অন-চ্যাট ইভেন্ট**
  onChat: async function ({ event, message }) {
    const threadID = event.threadID;
    const gameInstance = gameInstances.get(threadID);
    if (!gameInstance) return;

    const currentPlayerID = gameInstance.fight.currentPlayer;
    const currentPlayer = gameInstance.fight.participants.find(p => p.id === currentPlayerID);
    const attack = event.body.trim().toLowerCase();
    const isCurrentPlayer = event.senderID === currentPlayerID;

    // **অন্যজনের টার্ন হলে আক্রমণ আটকানো হবে**
    if (!isCurrentPlayer) {
      return message.send(`😒 এখন ${currentPlayer.name}-এর টার্ন! আপনি এখন আক্রমণ করতে পারবেন না।`);
    }

    // **ফাইটের বিভিন্ন কেস হ্যান্ডেল করা**
    if (attack === "forfeit") {
      message.send(`🏃 ${currentPlayer.name} আত্মসমর্পণ করল! বিজয়ী: ${gameInstance.fight.participants.find(p => p.id !== currentPlayerID).name}!`);
      return endFight(threadID);
    } else if (["kick", "punch", "slap"].includes(attack)) {
      const damage = Math.random() < 0.1 ? 0 : Math.floor(Math.random() * 20 + 10);
      const opponent = gameInstance.fight.participants.find(p => p.id !== currentPlayerID);
      opponent.hp -= damage;

      message.send(`🥊 ${currentPlayer.name} আক্রমণ করলো ${opponent.name}-কে! **${damage} ড্যামেজ** দেওয়া হলো!\n\n🩸 ${opponent.name}-এর HP: ${opponent.hp}`);

      if (opponent.hp <= 0) {
        message.send(`🏆 বিজয়ী: ${currentPlayer.name}! ${opponent.name} পরাজিত হয়েছে!`);
        return endFight(threadID);
      }

      // **টার্ন পরিবর্তন করুন**
      gameInstance.fight.currentPlayer = opponent.id;
      message.send(`🔄 এখন ${opponent.name}-এর টার্ন!`);
    } else {
      message.reply("❌ **ভুল কমান্ড!** ব্যবহার করুন: 'kick', 'punch', 'slap', 'forfeit'");
    }
  },
};

// **🎬 ফাইট শুরু করার ফাংশন**
function startFight(message, fight) {
  ongoingFights.set(fight.threadID, fight);
  const currentPlayer = fight.participants.find(p => p.id === fight.currentPlayer);
  const opponent = fight.participants.find(p => p.id !== fight.currentPlayer);

  message.send(
    `⚔️ **${currentPlayer.name} চ্যালেঞ্জ করলো ${opponent.name}-কে!**\n\n` +
    `🩸 উভয়ের HP: **${currentPlayer.hp}**\n` +
    `🎲 **${currentPlayer.name} প্রথমে আক্রমণ করবে!**\n\n` +
    `🛡️ কমান্ড: *kick, punch, slap, forfeit*`
  );
}

// **⏳ টাইমআউট সেটআপ**
function startTimeout(threadID, message) {
  const timeoutID = setTimeout(() => {
    const gameInstance = gameInstances.get(threadID);
    if (gameInstance) {
      const winner = gameInstance.fight.participants.reduce((a, b) => (a.hp > b.hp ? a : b));
      message.send(`⏰ টাইমআউট! **${winner.name}** জিতে গেল কারণ তার বেশি HP ছিল!`);
      endFight(threadID);
    }
  }, TIMEOUT_SECONDS * 1000);

  gameInstances.get(threadID).timeoutID = timeoutID;
}

// **🏁 ফাইট শেষ করার ফাংশন**
function endFight(threadID) {
  ongoingFights.delete(threadID);
  const gameInstance = gameInstances.get(threadID);
  if (gameInstance?.timeoutID) {
    clearTimeout(gameInstance.timeoutID);
  }
  gameInstances.delete(threadID);
}
