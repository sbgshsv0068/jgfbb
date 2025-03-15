module.exports = {
  config: {
    name: "pay",
    version: "1.0",
    author: "Riley",
    role: 0,
    shortDescription: "give coins to another user",
    category: "Economy",
    guide: "{p}pay <user_id> <amount>",
  },
  onStart: async function ({ api, event, args, usersData }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const recipientID = args[0]; // ID penerima
    const amount = parseInt(args[1]); // Jumlah uang yang ingin diberikan

    if (isNaN(amount) || amount <= 0) {
      return api.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗔 𝗩𝗮𝗹𝗶𝗱 𝗔𝗺𝗼𝘂𝗻𝘁.", event.threadID);
    }

    if (userData.money < amount) {
      return api.sendMessage("𝗡𝗼𝘁 𝗘𝗻𝗼𝘂𝗴𝗵 𝗠𝗼𝗻𝗲𝘆 𝗧𝗼 𝗚𝗶𝘃𝗲.", event.threadID);
    }

    const recipientData = await usersData.get(recipientID);

    userData.money -= amount; // Kurangi uang dari pengirim
    recipientData.money += amount; // Tambahkan uang ke penerima

    await usersData.set(senderID, userData);
    await usersData.set(recipientID, recipientData);

    api.sendMessage(`𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 𝗚𝗶𝘃𝗲𝗻 ${amount} m𝗠𝗼𝗻𝗲𝘆 𝗧𝗼 𝗧𝗵𝗲 𝗥𝗲𝗰𝗶𝗽𝗶𝗲𝗻𝘁.`, event.threadID);
  },
};
