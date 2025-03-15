module.exports.config = {
  name: "banlist",
  version: "1.0.1",
aliases: ["banned"],
  author: {
      name: "NTKhang",
      contacts: ""
  },
  cooldowns: 5,
  role: 1,
  shortDescription: "see list of banned groups/users",
  longDescription: "see list of banned groups/users",
  category: "owner",
  guide: "{p}{n} [thread|user]"
};

module.exports.onStart = async function({ api, event, args, usersData, threadsData }) {
  let target, type;
  if (["thread", "-t"].includes(args[0])) {
      target = await threadsData.getAll();
      type = "group";
  } else if (["user", "-u"].includes(args[0])) {
      target = await usersData.getAll();
      type = "user";
  } else return api.sendMessage("Syntax error! Please use {p}bannedlist [thread|user]", event.threadID);

  const bannedList = target.filter(item => item.banned.status);
  const msg = bannedList.reduce((i, item) => i += `𝗡𝗮𝗺𝗲: ${item.name}\n𝗜𝗗: ${item.id}\n𝗥𝗲𝗮𝘀𝗼𝗻: ${item.banned.reason}\n𝗧𝗶𝗺𝗲: ${item.banned.date}\n\n`, "");

  api.sendMessage(msg ? `𝗖𝘂𝗿𝗲𝗻𝘁𝗹𝘆 ${bannedList.length} \n${type}(s) 𝗛𝗮𝘃𝗲 𝗕𝗲𝗲𝗻 𝗕𝗮𝗻𝗻𝗲𝗱 𝗙𝗿𝗼𝗺 𝗨𝘀𝗶𝗻𝗴 𝗧𝗵𝗲 𝗕𝗼𝘁 :\n${msg}` : `𝗧𝗵𝗲𝗿𝗲 𝗔𝗿𝗲 𝗡𝗼𝘄 \n${type}(s) 𝗪𝗵𝗼 𝗔𝗿𝗲 𝗣𝗿𝗼𝗵𝗶𝗯𝗶𝘁𝗲𝗱 𝗙𝗿𝗼𝗺 𝗨𝘀𝗶𝗻𝗴 𝗧𝗵𝗲 𝗕𝗼𝘁.`, event.threadID);
    }