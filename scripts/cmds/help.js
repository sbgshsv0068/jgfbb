const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | RANA GOATBOT V2 ]";
 
module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "NTKhang", // orginal author RANA
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},
 
	onStart: async function ({ message, args, event, threadsData, role }) {
	const { threadID } = event;
	const threadData = await threadsData.get(threadID);
	const prefix = getPrefix(threadID);
 
	if (args.length === 0) {
			const categories = {};
			let msg = "";
 
			msg += `╔彡[🔥 𝗥𝗔𝗡𝗔 𝗕𝗢𝗧 𝗖𝗠𝗗 💐]彡╗`;
 
			for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role) continue;
 
					const category = value.config.category || "Uncategorized";
					categories[category] = categories[category] || { commands: [] };
					categories[category].commands.push(name);
			}
8
			Object.keys(categories).forEach(category => {
					if (category !== "info") {
							msg += `\n‎╭────────────╯\n│    ✦  ${category.toUpperCase()}  ✦`;
 
							const names = categories[category].commands.sort();
							for (let i = 0; i < names.length; i += 1) {
									const cmds = names.slice(i, i + 1).map(item => `‎├── ❯  ${item} `);
									msg += `\n${cmds.join(" ".repeat(Math.max(0, 5 - cmds.join("").length)))}`;
							}
 
							msg += `\n‎╰────────────╮`;
					}
			});
 
			const totalCommands = commands.size;
			msg += `\n‎╭━─━≪🟢 🟡≫━─━╯\n‎│➮𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅  [ / ] \n│➮𝗧𝗼𝘁𝗮𝗹 𝗰𝗺𝗱𝘀 ${totalCommands} \n`;
			msg += `‎│➮𝗧𝘆𝗽𝗲 ${prefix} 𝗵𝗲𝗹𝗽 𝘁𝗼 𝘃𝗶𝗲𝘄 𝗮𝗹𝗹 𝗰𝗺𝗱𝘀 \n‎‎╰━─━≪🟢 🟡≫━─━╯\n\n`;
			msg += `- 𝗥𝗔𝗡𝗔 𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🌸`;
 
 
			const helpListImages = [
				"https://i.imgur.com/aSvCogu.mp4"
			];
 
 
			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];
 
 
			await message.reply({
					body: msg,
					attachment: await global.utils.getStreamFromURL(helpListImage)
			});
	} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));
 
			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";
 
				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";
 
				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);
 
				const response = `‎╭────[ 𝗡𝗔𝗠𝗘 ]─────❖
‎├‣ ${configCommand.name}
‎├── ❯ 𝗜𝗡𝗙𝗢 ♐
‎├‣ 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${longDescription}
‎├‣ 𝙾𝚝𝚑𝚎𝚛 𝙽𝚊𝚖𝚎: ${configCommand.aliases ? configCommand.aliases.join(", ") : "𝙳𝚘 𝚗𝚘𝚝 𝚑𝚊𝚟𝚎"}
‎├‣ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: ${configCommand.version || "1.0"}
‎├‣ 𝚁𝚘𝚕𝚎: ${roleText}
‎├‣ 𝚃𝚒𝚖𝚎: ${configCommand.countDown || 1}s
‎├‣ 𝙰𝚞𝚝𝚑𝚘𝚛: ${author}
‎├── ❯ 𝗨𝗦𝗔𝗚𝗘 ♐
‎├‣ ${usage}
‎├──❯ 𝗡𝗢𝗧𝗘𝗦 ♐
‎├‣ 𝐃𝐨𝐧𝐭 𝐒𝐩𝐚𝐦 𝐇𝐚𝐫𝐞.. ⚠️
‎├‣ 𝐄𝐧𝐣𝐨𝐲 𝐑𝟒𝐍𝟒 𝐁𝐎𝐓.. 🤖
‎╰──────────────❖`;
 
				await message.reply(response);
			}
		}
	},
};
 
function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
						}
