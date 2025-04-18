const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

function getTimeString() {
	const now = new Date();
	now.setHours(now.getHours() + 6); 
	return now.toLocaleString("en-GB", {
		timeZone: "Asia/Dhaka",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	 });
}

function formatUsersList(userArray) {
	return userArray.map(({ uid, name }) => `• ${name}\n${uid}`).join("\n\n");
}

module.exports = {
	config: {
		name: "admin",
		version: "1.8",
		author: "NTKhang (modded by Rana)",
		countDown: 5,
		role: 2,
		description: {
			vi: "Thêm, xóa, sửa quyền admin",
			en: "Add, remove, edit admin role"
		},
		category: "box chat",
		guide: {
			vi: '   {pn} [add | -a] <uid | @tag>: Thêm quyền admin cho người dùng'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Xóa quyền admin của người dùng'
				+ '\n	  {pn} [list | -l]: Liệt kê danh sách admin',
			en: '   {pn} [add | -a] <uid | @tag>: Add admin role for user'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Remove admin role of user'
				+ '\n	  {pn} [list | -l]: List all admins'
		}
	},

	langs: {
		en: {
			added: "‎   ♻️｡✧ 𝗔𝗗𝗠𝗜𝗡-𝗥𝗢𝗟𝗘 ✧｡♻️\n━━━━━━━━━━━━━━━━━━━\n🎀｡𝙰𝚍𝚍𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚏𝚞𝚕𝚕𝚢｡🎀\n━━━━━━━━━━━━━━━━━━━\n👤 𝚄𝚜𝚎𝚛 | %2\n♻️ 𝙰𝚍𝚍𝚎𝚍 𝙱𝚢 | %3\n⏱️ 𝚃𝚒𝚖𝚎 | %4\n━━━━━━━━━━━━━━━━━━━",
			alreadyAdmin: "\n⚠️ | %1 𝚄𝚜𝚎𝚛 𝙰𝚕𝚛𝚎𝚊𝚍𝚢 𝙷𝚊𝚟𝚎 𝙰𝚗 𝙰𝚍𝚖𝚒𝚗 𝚁𝚘𝚕𝚎 :\n%2",
			missingIdAdd: "⚠️ | Please enter ID or tag user to add admin role",
			removed: "✅ | 𝚁𝚎𝚖𝚘𝚟𝚎𝚍 𝙰𝚍𝚖𝚒𝚗 𝚁𝚘𝚕𝚎 𝙾𝚏  %1 𝚄𝚜𝚎𝚛:\n%2\n\n➖ 𝚁𝚎𝚖𝚘𝚟𝚎𝚍 𝙱𝚢: %3\n⏱️ 𝚃𝚒𝚖𝚎: %4",
			notAdmin: "⚠️ | %1 users don't have admin role:\n%2",
			missingIdRemove: "⚠️ | Please enter ID or tag user to remove admin role",
			listAdmin: "‎  ♻️｡✧ 𝗟𝗶𝘀𝘁 𝗢𝗳 𝗔𝗱𝗺𝗶𝗻 ✧｡♻️\n━━━━━━━━━━━━━━━━━━━\n🎀｡ 𝚃𝚘𝚝𝚊𝚕 𝙰𝚍𝚖𝚒𝚗 : %2 ｡🎀\n━━━━━━━━━━━━━━━━━━━\n👤 | %1\n\n⏱️ | %3\n━━━━━━━━━━━━━━━━━━━"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		const timeNow = getTimeString();
		const authorUID = event.senderID;
		const authorName = await usersData.getName(authorUID);
		const byInfo = `${authorName} (${authorUID})`;

		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));

					const notAdminIds = [];
					const alreadyAdminIds = [];

					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							alreadyAdminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.adminBot.push(...notAdminIds);
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

					const addedNames = await Promise.all(notAdminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					const alreadyNames = await Promise.all(alreadyAdminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, formatUsersList(addedNames), byInfo, timeNow) : "") +
						(alreadyAdminIds.length > 0 ? getLang("alreadyAdmin", alreadyAdminIds.length, formatUsersList(alreadyNames)) : "")
					);
				} else return message.reply(getLang("missingIdAdd"));
			}

			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));

					const removedIds = [];
					const notAdminIds = [];

					for (const uid of uids) {
						if (config.adminBot.includes(uid)) {
							removedIds.push(uid);
							config.adminBot.splice(config.adminBot.indexOf(uid), 1);
						} else {
							notAdminIds.push(uid);
						}
					}

					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

					const removedNames = await Promise.all(removedIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					const notAdminNames = await Promise.all(notAdminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));

					return message.reply(
						(removedIds.length > 0 ? getLang("removed", removedIds.length, formatUsersList(removedNames), byInfo, timeNow) : "") +
						(notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, formatUsersList(notAdminNames)) : "")
					);
				} else return message.reply(getLang("missingIdRemove"));
			}

			case "list":
			case "-l": {
				const adminList = await Promise.all(config.adminBot.map(uid =>
					usersData.getName(uid).then(name => ({ uid, name }))
				));
				return message.reply(getLang("listAdmin", formatUsersList(adminList), config.adminBot.length, timeNow));
			}

			default:
				return message.SyntaxError();
		}
	}
};
