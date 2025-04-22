const fs = require("fs-extra");
 
module.exports = {
config: {
    name: "bebs",
    version: "1.0",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot Will Reply You In Engish/Bangla Language",
    category: "chat",
    guide: {
      en: "{p}{n}",
    }
  },
 
 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
 
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("hh:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
 
  var Messages = ["বেশি বেবি বেবি করলে চুম্মা দিয়া তোমার কিডনি ব্লক করে দেবো..!😦🎀" , "শুনবো না 😼 তুমি আমাকে প্রেম করাই দাও নাই পচা তুমি..!🥺🎀" , "আমি আবাল দের সাথে কথা বলি না,ওকে..!😒🎀" , "এতো ডেকো না,প্রেম এ পরে যাবো তো..!🙈🎀" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো..?🙈🎀" , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু..!😑🎀", "হ্যা বলো😒, তোমার জন্য কি করতে পারি..!😐🎀" , "এতো ডাকছিস কেন?গালি শুনবি নাকি..? 🤬🎀" , "I love you janu..!🥰🎀" , "আরে Bolo আমার জান ,কেমন আছো..?😚🎀 " , "এত যে বেবি বেবি করো তোমরা কি আমার ভাতার লাগো..!😦🎀" , "Hop beda😾, bby বল bby..!😼🎀" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু..!😒🎀" , "বেবি না jerry বল আমার নাম jerry..!😾🎀 " , "বার বার Disturb করছিস কোনো..!,আমার জানুর সাথে ব্যাস্ত আছি..!😋🎀" , "বোকাচোদা এতো ডাকিস কেন..!🤬🎀" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো..!😘🎀 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন..!😒🎀" , "হ্যাঁ জানু , এইদিক এ আসো কিস দেই..😘🎀" , "দূরে যা, তোর কোনো কাজ নাই, শুধু বেবি বেবি করিস..!🤣🎀" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো..?🤔🎀" , "আমাকে ডেকো না,আমি ব্যাস্ত আছি..!😒🎀" , "কি হলো , মিস করচ্ছিস নাকি..!🤣🎀" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈🎀" , "হা বলো, শুনছি আমি..!😏🎀" , "আর কত বার ডাকবি ,শুনছি তো.. 😒🎀" , "হুম বলো কি বলবে..!😒🎀" , "বলো কি করতে পারি তোমার জন্য..!😒🎀" , "আমি তো অন্ধ কিছু দেখি না..!🐸🎀 " , "আর একবার আমার নাম ধরে ডাকলে তোরে কোলে করে বেডরুমে নিয়ে আসব..😉🎀" , "বলো জানু..!🌚🎀" , "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি..!😒🎀","হুম জান তোমার ওই খানে উম্মহ..!😒🎀" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ..!😇🎀" , " jang hanga korba..!😬🎀" , "হুম জান তোমার অইখানে উম্মমাহ..!😘🎀" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰🎀" , "আমাকে এতো না ডেকে বস রানা কে একটা গফ দে.!🙄🎀" , "আমাকে এতো না ডেকে বস রানা কে একটা গফ দে..!🙄🎀"];
 
    var rand = Messages[Math.floor(Math.random() * Messages.length)]
 
        if ((event.body.toLowerCase() == "kiss me") || (event.body.toLowerCase() == "Kiss me")) {
         return api.sendMessage("--ইনবক্সে আসো চুম্মা দিয়া তোমার পুক্কি লাল করে দিমু--😚😏 ", threadID);
       };
 
        if ((event.body.toLowerCase() == "Call") || (event.body.toLowerCase() == "call dew")) {
         return api.sendMessage("--Audio call 500+ Video call 1000+ okay--🍆😩", threadID);
       };
 
       if ((event.body.toLowerCase() == "eta kar") || (event.body.toLowerCase() == "eta kar bot")) {
         return api.sendMessage("-তোমার নানার বট এটা 😑", threadID);
       };
 
       if ((event.body.toLowerCase() == "bot koi") || (event.body.toLowerCase() == "bot koi")) {
         return api.sendMessage("-তোমার নানির চিপাই !😒🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "kemne ki") || (event.body.toLowerCase() == "kivabe")) {
         return api.sendMessage("--বলবো না 🐸🎀", threadID);
       };
 
      if ((event.body.toLowerCase() == "Oo") || (event.body.toLowerCase() == "Ooo")) {
         return api.sendMessage("--ওও আচ্ছা আচ্ছা এই ব্যাপার.. 🐸🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "Ooo") || (event.body.toLowerCase() == "tai")) {
         return api.sendMessage("-হুমম 🌸🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "na") || (event.body.toLowerCase() == "না")) {
         return api.sendMessage("-*এতো না'না করোস কেন...//-😑🤦‍♂️", threadID);
       };
 
       if ((event.body.toLowerCase() == "uff") || (event.body.toLowerCase() == "ufff")) {
         return api.sendMessage("️--আহহহহহ্হঃ:>🙂", threadID);
       };
 
       if ((event.body.toLowerCase() == "cup") || (event.body.toLowerCase() == "চুপ")) {
         return api.sendMessage("️••>তুই চুপ 🤫 তোর চোদ্দো গুষ্টি চুপ..:>😼", threadID);
       };
 
       if ((event.body.toLowerCase() == "stop") || (event.body.toLowerCase() == "chup")) {
         return api.sendMessage("️••>তুই চুপ 🤫 তোর চোদ্দো গুষ্টি চুপ..:>😼", threadID);
       };
 
       if ((event.body.toLowerCase() == "oi") || (event.body.toLowerCase() == "oii")) {
         return api.sendMessage("️--ওইই! 🙄 আবার কি চাই? খেয়ে দেয়ে কাজ নাই, শুধু আমাকে ডাকো 😑… আচ্ছা বলো, এবার কি কাণ্ড ঘটাইলা..? 🤔🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "ahh") || (event.body.toLowerCase() == "ahhh")) {
         return api.sendMessage("️--এতো উফ আঃ করে না সোনা..!🫶🐸🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "sexy") || (event.body.toLowerCase() == "sexi bot")) {
         return api.sendMessage("️--হুম তুমিও সেক্সি..!!🐸👍", threadID);
       };
 
       if ((event.body.toLowerCase() == "uhh")) {
         return api.sendMessage("️--আহহহহহ্হ..!😦🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "eta dew")) {
         return api.sendMessage("️--দিবো না যা ভাগ..!-😼🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "fuck")) {
         return api.sendMessage("️--fuck you nonstop.. 🫵🥵", threadID);
       };
 
       if ((event.body.toLowerCase() == "umm") || (event.body.toLowerCase() == "yes yes")) {
         return api.sendMessage("️--হেই বেবি 🥵 what are yoy doing.. 😦🫵", threadID);
       };
 
       if ((event.body.toLowerCase() == "kew nai")) {
         return api.sendMessage("️--চুপ থাকা মানে এই নাযে কেউ নাই, আসলে সবাই ইনবক্সে মেয়ে নিয়ে বিজি..!🐸🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "pok")) {
         return api.sendMessage("️--মারা খাও..!!😼🔖", threadID);
       };
 
       if ((event.body.toLowerCase() == "karent")) {
         return api.sendMessage("--তোর প্রেমের মতোই এখনকার বিদ্যুৎ, আসে না আবার গেলেও টের পাই না...!🤣🙄", threadID);
       };
 
       if ((event.body.toLowerCase() == "karent nai") || (event.body.toLowerCase() == "কারেন্ট")) {
         return api.sendMessage("--তোর প্রেমের মতোই এখনকার বিদ্যুৎ, আসে না আবার গেলেও টের পাই না...!🤣🙄", threadID);
       };
 
       if ((event.body.toLowerCase() == "sala") || (event.body.toLowerCase() == "e sala")) {
         return api.sendMessage("--আরেহ পাগল! দিস না গালি , পারলে দে তোর শালী 😦🎀!‍‍‍‍‍‍", threadID);
       };
 
       if ((event.body.toLowerCase() == "জলে") || (event.body.toLowerCase() == "jole")) {
         return api.sendMessage("--শুধু জলে না পুরেও..!!🙄🎀", threadID);
       };
 
       if ((event.body.toLowerCase() == "bts")) {
         return api.sendMessage("--Biggest হিজড়া In The World..//-🤣👍", threadID);
       };
 
       if ((event.body.toLowerCase() == "bts ki")) {
         return api.sendMessage("Yes I l", threadID);
       };
 
       if ((event.body.toLowerCase() == "sakin")) {
         return api.sendMessage("-𝐌𝐲 𝐎𝐰𝐧𝐞𝐫.. 😊🎀🫶", threadID);
       };
 
       if ((event.body.toLowerCase() == "sakin koi") || (event.body.toLowerCase() == "Sakin koi")) {
         return api.sendMessage("-𝘋𝘰𝘯𝘵 𝘊𝘢𝘭𝘭 𝘔𝘺 𝘖𝘸𝘯𝘦𝘳.. 😾🎀🫶", threadID);
       };
 
       if ((event.body.toLowerCase() == "/off")) {
         return api.sendMessage("- নবিন পোলাপান এলাও নাই -🐸", threadID);
       };
 
       if ((event.body.toLowerCase() == "/left") || (event.body.toLowerCase() == "does the bot fall")) {
         return api.sendMessage("-নবিন পোলাপান এলাও নাই - 🐸", threadID);
       };
 
    if ((event.body.toLowerCase() == "tomar nam ki")) {
     return api.sendMessage("নাম যায় না কি করবি আমি সানি লিওনের ক্যামেরা ম্যান এইটুকু জেনে রাখ ☹️", threadID, messageID);
   };
 
    if ((event.body.toLowerCase() == "ke tumi") || (event.body.toLowerCase() == "apni ke")) {
     return api.sendMessage("️-নাম যায় না কি করবি আমি সানি লিওনের ক্যামেরা ম্যান এইটুকু জেনে রাখ ☹️", threadID, messageID);
   };
 
    if ((event.body.toLowerCase() == "inbox") || (event.body.toLowerCase() == "ইনবক্স")) {
     return api.sendMessage("️-ষ্যার আপনার ইনবক্সে গালি দিসি চেক দিয়েন 😊", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "hmm") || (event.body.toLowerCase() == "hum")) {
     return api.sendMessage("️-আর কোনো কথা বলতে পারো না, শুধু হুম হুম করো 😾", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "bro") || (event.body.toLowerCase() == "Bro")) {
     return api.sendMessage("️-আমি ব্রা বিক্রি করিনা এখন••:>🙂", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "bye") || (event.body.toLowerCase() == "by")) {
     return api.sendMessage("️--আপনে আসতে পারেন ধন্যবাশ 😩", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "sorry") || (event.body.toLowerCase() == "সরি") || (event.body.toLowerCase() == "সবাই কেমন আছেন")) {
     return api.sendMessage("️মানুষ মাত্রই ভুল ক্ষমা চায়ার মাইরে সালাম 😚🖤", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "tnx") || (event.body.toLowerCase() == "thanks") || (event.body.toLowerCase() == "Assalamu alaikum")) {
     return api.sendMessage("️Welcome 🙌", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "call daw")) {
     return api.sendMessage("️অডিও কল ৫০০+ ভিডিও কল ১০০০ ওকে", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "/out")) {
     return api.sendMessage("️খেলা শুরুর আগেই আউট হলে তোমার বউ থাকবনা 🙄", threadID, messageID);
   };
 
   if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hii")) {
     return api.sendMessage("️-হাই হ্যালো না করে - দিনে কয়টা প্রেম করো এইটা বলো 🙂👍", threadID, messageID);
   };
 
   if ((event.body.toLowerCase() == "hello")) {
     return api.sendMessage("️--ভাত পাইনা খাইতে হ্যালো চুদাই রাইতে 🙄", threadID, messageID);
   };
 
   if ((event.body.toLowerCase() == "oh")) {
     return api.sendMessage("🤧 সবকিছু বুঝতে পারি কিন্তু এই ওহ পরে কি যে বলব এটাই বুঝতে পারিনা 😔", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "ohh") || (event.body.toLowerCase() == "ooh")) {
     return api.sendMessage("️🤧 সবকিছু বুঝতে পারি কিন্তু এই ওহ পরে কি যে বলব এটাই বুঝতে পারিনা 😔", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "Mim koi") || (event.body.toLowerCase() == "mim") || (event.body.toLowerCase() == "Mim aso")) {
     return api.sendMessage("️--হুম বলো কি বলবা 🤭", threadID, messageID);
   };
 
    if ((event.body.toLowerCase() == "rana vai") || (event.body.toLowerCase() == "Rana vai") || (event.body.toLowerCase() == "rana koi")) {
     return api.sendMessage("️--Boss Ekhon Busy Ase Okay..!😑🎀", threadID, messageID);
   };
 
  if ((event.body.toLowerCase() == "who are you") || (event.body.toLowerCase() == "who r u")) {
     return api.sendMessage("️I Am R4N4-BOT, An AI Based Messenger Chatbot.", threadID, messageID);
   };
 
  if (event.body.indexOf("bebs") == 0 || (event.body.toLowerCase() == "beb") || (event.body.indexOf("বট") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
 
