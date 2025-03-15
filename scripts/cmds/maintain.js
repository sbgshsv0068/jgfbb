const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "maintain",
		aliases: ["maintainmode", "superadminonly", "superadmin"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "bật/tắt chỉ admin sử dụng bot",
			en: "turn on/off "
		},
		longDescription: {
			vi: "bật/tắt chế độ chỉ admin mới có thể sử dụng bot",
			en: "turn on/off only owner can use bot"
		},
		category: "owner",
		guide: {
			en: "{pn} [on | off]"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ admin mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ admin mới có thể sử dụng bot",
			syntaxError: "Sai cú pháp, chỉ có thể dùng {pn} on hoặc {pn} off"
		},
		en: {
			turnedOn: "𝗧𝘂𝗿𝗻𝗲𝗱 𝗢𝗻 𝗧𝗵𝗲 𝗠𝗼𝗱𝗲, 𝗡𝗼𝘄 𝗢𝗻𝗹𝘆 𝗢𝘄𝗻𝗲𝗿 𝗖𝗮𝗻 𝗨𝘀𝗲 𝗕𝗼𝘁",
			turnedOff: "𝗧𝘂𝗿𝗻𝗲𝗱 𝗢𝗳𝗳 𝗧𝗵𝗲 𝗠𝗼𝗱𝗲",
			syntaxError: "Syntax error, only use {pn} on or {pn} off"
		}
	},

	onStart: function ({ args, message, getLang  }) {
    const permission = global.GoatBot.config.GOD;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("𝗬𝗼𝘂 𝗗𝗼𝗻'𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝗧𝗼 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀. 𝗢𝗻𝗹𝘆 𝗠𝘆 𝗔𝗱𝗺𝗶𝗻 𝗛𝗮𝘃𝗲 𝗔𝗰𝗰𝗲𝘀.", event.threadID, event.messageID);
    return;
  }
		if (args[0] == "on") {
			config.adminOnly.enable = true;
			message.reply(getLang("turnedOn"));
			fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
		}
		else if (args[0] == "off") {
			config.adminOnly.enable = false;
			message.reply(getLang("turnedOff"));
			fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
		}
		else
			return message.reply(getLang("syntaxError"));
	}
};
