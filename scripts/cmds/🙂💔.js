module.exports = {
 config: {
	 name: "afroja",
	 version: "1.0",
	 author: "Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆",
	 countDown: 5,
	 role: 2,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function() {
	 const expectedAuthor = "Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆";
	 if (this.config.author !== expectedAuthor) {
		 throw new Error("Unauthorized change detected in the author field. Please restore the original author.");
	 }
 },

 onChat: async function({ event, message }) {
	 if (!event.body) return;

	 const userMessage = event.body.toLowerCase();
	 const allowedPatterns = [
  "🙂💔", "🙂💔", "🙂💔", "🙂💔", "🙂💔", "🙂💔", 
  "😞💔", "😞💔", "😞💔", "😕💔", "😕💔🥹", "😕💔", 
  "🙁💔", "😅💔", "😅💔", "🙂💔", "😊💔", "🥺💔", 
  "😩💔🫠", "🫤😩💔", "😩💔", "😅💔", "😅💔", "😅💔", "😅💔", 
  "🥺💔", "🥺💔", "🥺💔", "🥺🥺", "🥺💔", "🥺💔", 
  "🥺💔", "🥺💔", "🙂💔", "🥺💔", "🥺💔", "🥺💔", 
  "🥺💔", "🥺💔", "🥺💔", "🥺💔", "🥺💔", "🥺💔", 
  "😅💔", "😅💔", "😅💔", "😅💔", "😅💔", "😅💔", 
  "🫠😅💔", "😅💔", "😅💔", "😅💔", "😅💔", "😅💔", 
  "😓💔", "😞💔", "😞💔", "😞💔", "🥺", "😞🥺", 
  "🥺😞"
];

	 if (allowedPatterns.includes(userMessage)) {
		 const videoLinks = [
			 "https://i.imgur.com/vKOL5eK.mp4",
			 "https://i.imgur.com/51ZDw9M.mp4",
			 "https://i.imgur.com/dP3Dsvq.mp4",
			 "https://i.imgur.com/yghIhhw.mp4",
			 "https://i.imgur.com/8tnWTZL.mp4",
			 "https://i.imgur.com/wtjdatS.mp4",
			 "https://i.imgur.com/j9IN1yl.mp4",
			 "https://i.imgur.com/ZwKjDgT.mp4",
			 "https://i.imgur.com/3on54wH.mp4",
			 "https://i.imgur.com/qXhgERy.mp4",
			 "https://i.imgur.com/mucHjY6.mp4",
			 "https://i.imgur.com/qZHm266.mp4",
			 "https://i.imgur.com/J6JQxta.mp4",
			 "https://i.imgur.com/iMgvhhy.mp4",
			 "https://i.imgur.com/YJJP8ay.mp4",
			 "https://i.imgur.com/jJNZFap.mp4",
			 "https://i.imgur.com/XDJ3s19.mp4",
			 "https://i.imgur.com/Uzn4bZW.mp4",
			 "https://i.imgur.com/eSIckfX.mp4",
			 "https://i.imgur.com/g4Iitdm.mp4",
			 "https://i.imgur.com/xbj2o30.mp4",
			 "https://i.imgur.com/lcVP1ZL.mp4",
			 "https://i.imgur.com/YvW8Xds.mp4",
			 "https://i.imgur.com/c1U246v.mp4",
			 "https://i.imgur.com/CGmdkHR.mp4",
			 "https://i.imgur.com/IWXUk0F.mp4",
			 "https://i.imgur.com/02796Na.mp4",
			 "https://i.imgur.com/D2QeMkT.mp4",
			 "https://i.imgur.com/pE78BA3.mp4",
			 "https://i.imgur.com/MX6s1um.mp4",
			 "https://i.imgur.com/OqkEwso.mp4",
			 "https://i.imgur.com/jBDV3LL.mp4",
			 "https://i.imgur.com/psbObAt.mp4",
			 "https://i.imgur.com/9H1XpZh.mp4",
			 "https://i.imgur.com/eTlBg9p.mp4",
			 "https://i.imgur.com/rzwsE9d.mp4",
			 "https://i.imgur.com/EPEQ7Dz.mp4",
			 "https://i.imgur.com/kBmpxSF.mp4",
			 "https://i.imgur.com/VHHBMm6.mp4",
			 "https://i.imgur.com/yTjY2EW.mp4",
			 "https://i.imgur.com/Kyq4krt.mp4",
			 "https://i.imgur.com/DZL63ul.mp4"
		 ];

		 const captions = [
			 "     「🦋🥀তোমাকে পেলে খুব যত্ন করে রেখে দিবো 🙂 \nকারন তুমি হচ্ছো আমার জীবনে সবচেয়ে  মূল্যবান কিছু 🥹\n\n তবে আমার মা-বাবার পরে 😊🖤」",
			 "     「🌸 তুমি আমার জীবনে সবচেয়ে মূল্যবান \ন তোমার যত্ন নেওয়ার প্রতিশ্রুতি সারাজীবন থাকবে। 💖」",
			 "     「🌹 প্রতিদিন তোমাকে ভালোবাসি। তুমি আমার মনের সব থেকে সুন্দর একটা জায়গা। 💞」",
			 "     「💔 তুমি আমার স্বপ্ন। তোমার পাশে থাকাই আমার জীবনের সবচেয়ে বড় চাওয়া। ✨」",
			 "     「🖤 তুমি ছাড়া জীবন অসম্পূর্ণ। 💫 আমার জন্য তুমি সবকিছু। 💕」",
			 "     「☹💔🥀মানুষের জীবন কখনো রঙীন-কখনো ধূসর কখনো বা সাদা কালো। কখনো জীবন স্বপ্নের মত কখনো বা বিশাল ধাঁধাঁ!! ☹💔🥀」",
			 "     「🖤☹💔🥀তোমার জীবন থেকে চিরদিনের জন্য যদি কখনো হারিয়ে যাই তাহলে চোখের জল ফেলনা। ভেবে নিও আমি তোমার স্বপ্ন ছিলাম মাত্র, আর ঘুম ভাঙতেই আমি চলে গেলাম।☹💔🥀 💕」",
			 "     「🖤 ☹💔🥀মানুষের জীবন বড়ই অদ্ভুত। কেউ কেউ একটু ভালোবাসা পাবার জন্য সব কিছু বিসর্জন দেয়, আবার কেউ এক সাগর ভালোবাসা পেয়েও ভালোবাসার মানুষ কে অবহেলা করে!☹💔🥀💕」",
			 "     「🖤☹💔🥀যে মনে রাখার মতো হাজারো স্মৃতি উপহার দেয়, তাকে কোনো কালে ভুলে যাওয়া যায় না। ☹💔🥀 💕」"
		 ];

		 const randomLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];
		 const randomCaption = captions[Math.floor(Math.random() * captions.length)];

		 try {
			 const stream = await global.utils.getStreamFromURL(randomLink);

			 return message.reply({
				 body: randomCaption,
				 attachment: [stream]
			 });
		 } catch (error) {
			 console.error("Error processing video link:", randomLink, error);
			 return message.reply("দুঃখিত! ভিডিও পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
		 }
	 }
 }
};
