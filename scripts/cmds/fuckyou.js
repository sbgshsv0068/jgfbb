module.exports = {
 config: {
   name: "fuckyou",
   version: "1.0",
   author: "MR.AYAN",
   countDown: 5,
   role: 0,
   shortDescription: "no prefix",
   longDescription: "no prefix",
   category: "18+",
 },
  
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "fuck you") {
 return message.reply({
 body: "  .. ",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/tJhkqJKH/2fa.gif")
 });
 }
 }
}
