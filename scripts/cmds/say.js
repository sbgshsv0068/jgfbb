const gtts = require("google-tts-api");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

module.exports = {
	config: {
		name: "say",
		version: "2.0",
		author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		usePrefix: true,
		countDown: 3,
		role: 0,
		description: {
			en: "Convert your text into stylish speech!",
		},
		category: "fun",
		guide: {
			en: "{pn} <style> <text>\n\n🎭 Available Styles:\n- male\n- female\n- funny\n- robot\n- deep\n- slow",
		}
	},

	onStart: async function ({ message, args }) {
		if (args.length < 2) return message.reply("🗣️ Usage: say <style> <text>\nExample: say funny Hello, how are you?");

		// ইউজারের দেওয়া ভয়েস স্টাইল এবং টেক্সট আলাদা করা
		const style = args[0].toLowerCase();
		const text = args.slice(1).join(" ");

		// ভয়েসের জন্য ল্যাঙ্গুয়েজ সেট করা
		const lang = "bn"; // বাংলা ভয়েস

		// ভয়েস ইফেক্ট সেট করা
		let pitch = 1.0; // স্বাভাবিক পিচ
		let speed = 1.0; // স্বাভাবিক স্পিড

		switch (style) {
			case "male":
				pitch = 0.9;
				break;
			case "female":
				pitch = 1.2;
				break;
			case "funny":
				pitch = 2.0;
				speed = 1.5;
				break;
			case "robot":
				pitch = 0.8;
				speed = 0.9;
				break;
			case "deep":
				pitch = 0.6;
				break;
			case "slow":
				speed = 0.6;
				break;
			default:
				return message.reply("❌ ভুল স্টাইল! উপলব্ধ স্টাইল:\n- male\n- female\n- funny\n- robot\n- deep\n- slow");
		}

		try {
			// Google TTS API থেকে অডিও লিংক
			const audioUrl = gtts.getAudioUrl(text, {
				lang,
				slow: speed < 1,
				host: "https://translate.google.com",
			});

			// MP3 ডাউনলোড এবং পাঠানো
			const filePath = path.join(__dirname, "voice.mp3");
			const response = await fetch(audioUrl);
			const buffer = await response.arrayBuffer();
			fs.writeFileSync(filePath, Buffer.from(buffer));

			// ভয়েস মেসেজ পাঠানো
			message.reply({ attachment: fs.createReadStream(filePath) });

			// টেম্প ফাইল ডিলিট
			setTimeout(() => fs.unlinkSync(filePath), 5000);
		} catch (err) {
			message.reply("❌ ভয়েস রূপান্তর করতে সমস্যা হয়েছে!");
			console.error(err);
		}
	}
};

