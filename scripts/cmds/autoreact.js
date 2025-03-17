module.exports = {
    config: {
        name: "autoreact",
		      version: "1.0",
	       	author: "Loid Butter",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "dont know ",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
		if (event.body.toLowerCase().indexOf("🙂") !== -1) return api.setMessageReaction("😙", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good night") !== -1) return api.setMessageReaction("🥱", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good morning") !== -1) return api.setMessageReaction("🥱", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("tom") !== -1) return api.setMessageReaction("😍", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😑") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🫠") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😢") !== -1) return api.setMessageReaction("😢", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😆") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😂") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🤣") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
    
   	if (event.body.toLowerCase().indexOf("afroja") !== -1) return api.setMessageReaction("😘", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("rana") !== -1) return api.setMessageReaction("😻", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("huss") !== -1) return api.setMessageReaction("🙃", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("cup") !== -1) return api.setMessageReaction("🤫", event.messageID,event.threadID)

    		if (event.body.toLowerCase().indexOf("🥵") !== -1) return api.setMessageReaction("🥵", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("❤️") !== -1) return api.setMessageReaction("💚", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("🖤") !== -1) return api.setMessageReaction("😽", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hi") !== -1) return api.setMessageReaction("🙈", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("hello") !== -1) return api.setMessageReaction("🙊", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("time") !== -1) return api.setMessageReaction("⏳", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("bal") !== -1) return api.setMessageReaction("😠", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("privet") !== -1) return api.setMessageReaction("😙", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😏") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😎") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("fuck you") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("fck") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("kid") !== -1) return api.setMessageReaction("👧", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("i hate you") !== -1) return api.setMessageReaction("😞", event.messageID,event.threadID)
  
    if (event.body.toLowerCase().indexOf("useless") !== -1) return api.setMessageReaction("😓", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("omg") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("abal") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("pagol") !== -1) return api.setMessageReaction("😁", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("gadha") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("i miss you") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("sad") !== -1) return api.setMessageReaction("😔", event.messageID,event.threadID)
    
  }
};
