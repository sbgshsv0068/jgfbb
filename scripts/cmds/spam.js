module.exports = {
	config: {
		name: "spam",
		version: "1.0",
		author: "MILAN",
		countDown: 0,
		role: 0,
		shortDescription: "spam",
		longDescription: "Do spam in a loop of any text 20 times",
		category: "goatbot",
		guide:  {
			en: "{pn} <𝗧𝗲𝘅𝘁> <𝗡𝘂𝗺𝗯𝗲𝗿>"
		}
	},  
	onStart: async function ({ api, event, args }) {
const permission = global.GoatBot.config.DEV;
const fuck = args.join(" ");
  if (!permission.includes(event.senderID)) {
   api.sendMessage(fuck, event.threadID, event.messageID)    
  }

  var message = args[0];
  var length = args[1] || 5;

 if (!message)
return api.sendMessage(`🔰 | 𝗧𝘆𝗽𝗲 𝗧𝗵𝗲 𝗧𝗲𝘅𝘁 𝗧𝗵𝗮𝘁 𝗬𝗼𝘂 𝗪𝗮𝗻𝘁 𝗧𝗼 𝗦𝗽𝗮𝗺.. `, event.threadID, event.messageID);
	var k = function (k) { api.sendMessage(k, event.threadID)};
for (i = 0; i < `${length}`; i++) 
{ k(`${message}`);} 
 }
};
