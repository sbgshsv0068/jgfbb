module.exports = {
 config: {
	 name: "siratul",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "siratul") {
 return message.reply({
 body: "    「🌻༉༊–Dear best friend ••!!😊ღ༊🥀」\n তোর উপর কারো নজর না লাগুক..! 🙂\n\n🖤🌸༊__ওয়াক😗থুথুথুথুথুথু .! 🤗🤣🖤༊ღ࿐😽\n\n••\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗥𝗮𝗻𝗮」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/Hf43Or1.mp4")
 });
 }
 }
}
