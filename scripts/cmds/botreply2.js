const fs = require("fs-extra");

module.exports = {
config: {
    name: "botreply2",
    version: "1.0",
    author: "RB-BADOL-KHAN",
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot Will Reply You In Engish/Bangla Language",
    category: "no prefix",
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

  var Messages = ["বেশি mim mim করলে চুম্মা দিয়া তোমার কিডনি ব্লক করে দেবো😒 " , "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" , "আমি আবাল দের সাথে কথা বলি না,ok😒" , "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?" , "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬" , "I love you janu🥰" , "আরে Bolo আমার জান ,কেমন আছো?😚 " , "এত যে মিম করো তোমরা কি আমার ভাতার লাগে 🥴" , "Hop beda😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু" , ", মিম না ভাবি বল ভাবি 😘 " , "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋" , "বোকাচোদা এতো ডাকিস কেন🤬" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু মিম মিম করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আছি" , "কি হলো , মিস্টেক করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "হুম বলো কি বলবে😒" , "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "আর একবার আমার নাম ধরে ডাকলে তোরে কোলে করে বেডরুমে নিয়ে আসব 😉" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মহ😑😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "আমাকে এতো না ডেকে বস বাদল চৌধুরী কে একটা গফ দে 🙄" , "আমাকে এতো না ডেকে বস রাজা বাবু কে একটা গফ দে 🙄"];

    var rand = Messages[Math.floor(Math.random() * Messages.length)]

        if ((event.body.toLowerCase() == "Vai") || (event.body.toLowerCase() == "Vai in ck")) {
         return api.sendMessage("inbox not allow ok,🙄", threadID);
       };

        if ((event.body.toLowerCase() == "Call aso") || (event.body.toLowerCase() == "call aso fast")) {
         return api.sendMessage("audio call 500+ Video call 1000+ ok🍆😩", threadID);
       };

       if ((event.body.toLowerCase() == "Admin") || (event.body.toLowerCase() == "Owner")) {
         return api.sendMessage("┏━━ [  𝐁𝐨𝐭-𝐎𝐰𝐧𝐞𝐫 ]━━➣\n┃🌻𝐍𝐚𝐦𝐞 :  [ 𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐑𝐀𝐍𝐀 ]\n┃🌻𝐅𝐚𝐜𝐜𝐛𝐨𝐨𝐤 :  [ 𝐌𝐨𝐡𝐚𝐦𝐦𝐚𝐝 𝐑𝐚𝐧𝐚 ]\n┃🌻𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : [ 𝐈𝐬𝐥𝐚𝐦 ]\n┃🌻𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : [ 𝐑𝐚𝐧𝐠𝐩𝐮𝐫 ]\n┃🌻𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : [ 𝐏𝐚𝐧𝐜𝐡𝐚𝐠𝐚𝐫𝐡 ]\n┃🌻𝐆𝐞𝐧𝐝𝐞𝐫 : [ 𝐌𝐚𝐥𝐞 ]\n┃🌻𝐀𝐠𝐞 : [ 𝟏𝟖+ ]\n┃🌻𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : [ 𝐒𝐢𝐧𝐠𝐥𝐞 ]\n┃🌻𝐖𝐨𝐫𝐤 : [ 𝐒𝐭𝐮𝐝𝐞𝐧𝐭 ]\n┃🌻𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 : [ wa.me/+8801988686406 ]\n┃🌻𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐔𝐬𝐞𝐫 : [ facebook.com/XAICO.RANA ]\n┃🌻𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐚𝐫𝐞 : [ m.me/100063487970328 ]\n┗━━━━━━━━━━━━➢", threadID);
       };

       if ((event.body.toLowerCase() == "dmm bot") || (event.body.toLowerCase() == "dmm bot")) {
         return api.sendMessage("Being disobedient to your biological parents, you say that's a broken person", threadID);
       };

       if ((event.body.toLowerCase() == "cursing cmm") || (event.body.toLowerCase() == "undercover cmm")) {
         return api.sendMessage("Being disobedient to your biological parents, you say that's a broken person", threadID);
       };

      if ((event.body.toLowerCase() == "bsvv nha mng") || (event.body.toLowerCase() == "bsvv nha mng")) {
         return api.sendMessage("Hello dear, have a nice day ❤️", threadID);
       };

       if ((event.body.toLowerCase() == "bsvv nha mn") || (event.body.toLowerCase() == "bsvv nha mn")) {
         return api.sendMessage("Hello dear, have a nice day ❤️", threadID);
       };

       if ((event.body.toLowerCase() == "btvv nha mn") || (event.body.toLowerCase() == "btvv nha mn")) {
         return api.sendMessage("Hello dear, have a nice day ❤️", threadID);
       };

       if ((event.body.toLowerCase() == "tt go mng") || (event.body.toLowerCase() == "tt go mng")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if ((event.body.toLowerCase() == "let's go") || (event.body.toLowerCase() == "let's go")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if ((event.body.toLowerCase() == "tt mng oi") || (event.body.toLowerCase() == "tt mng oi")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if ((event.body.toLowerCase() == "nn nha mng") || (event.body.toLowerCase() == "nn nha mng")) {
         return api.sendMessage("️Sleep well <3 Wish you all super nice dreams <3", threadID);
       };

       if ((event.body.toLowerCase() == "tt go mn") || (event.body.toLowerCase() == "tt go mn")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if ((event.body.toLowerCase() == "flop over") || (event.body.toLowerCase() == "flop")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if ((event.body.toLowerCase() == "clmm bot")) {
         return api.sendMessage("️Swear something dog :) you've been holding on to you for a long time", threadID);
       };

       if ((event.body.toLowerCase() == "bot cc")) {
         return api.sendMessage("️Swear something dog :) you've been holding on to you for a long time", threadID);
       };

       if ((event.body.toLowerCase() == "cc bot")) {
         return api.sendMessage("️Swear something dog :) you've been holding on to you for a long time", threadID);
       };

       if ((event.body.toLowerCase() == "bot dthw too") || (event.body.toLowerCase() == "bot dthw over")) {
         return api.sendMessage("️ that's very commendable hihi :>", threadID);
       };

       if ((event.body.toLowerCase() == "baler bot")) {
         return api.sendMessage("️😊 স্যার আপনার ইনবক্সে গালি দিছি চেক দিয়েন ধন্যবাদ 😑", threadID);
       };

       if ((event.body.toLowerCase() == "nobody loves me")) {
         return api.sendMessage("️Come on, the bot loves you <3 <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot love the admin bot")) {
         return api.sendMessage("Yes, love him the most, don't try to rob me", threadID);
       };

       if ((event.body.toLowerCase() == "bot im going") || (event.body.toLowerCase() == "bot im di")) {
         return api.sendMessage("Im cc :))) m stop barking for me, but tell me im :>>", threadID);
       };

       if ((event.body.toLowerCase() == "bot go away") || (event.body.toLowerCase() == "bot cut di")) {
         return api.sendMessage("You're gone, your dad's gone, don't make you speak :))))", threadID);
       };

       if ((event.body.toLowerCase() == "What's the bot swearing") || (event.body.toLowerCase() == "bot cursing")) {
         return api.sendMessage("Damn you, shame on hahaha :>>, still asking", threadID);
       };

       if ((event.body.toLowerCase() == "is the bot sad")) {
         return api.sendMessage("Why can't I be sad because of everyone <3 love you <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot love you")) {
         return api.sendMessage("Yes I love you and everyone so much", threadID);
       };

       if ((event.body.toLowerCase() == "bot goes to sleep")) {
         return api.sendMessage("I'm a bot, you're the one who should go to sleep <3", threadID);
       };

       if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
         return api.sendMessage("I'm full when I see you eat <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot love me")) {
         return api.sendMessage("Yes <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot have a brand") || (event.body.toLowerCase() == "does the bot fall")) {
         return api.sendMessage("Yes <3", threadID);
       };

    if ((event.body.toLowerCase() == "oh bot")) {
     return api.sendMessage("Hurry, I have to serve other boxes :)", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "chup thak")) {
     return api.sendMessage("️Amr Mukh, Amr iccha, Amr Mon. Tor ki bal,,,shala abal...ja vaag... 😒🙄", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "khana khaya?") || (event.body.toLowerCase() == "khaiso")) {
     return api.sendMessage("️Nh...Tmk khabo.💖🥳", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "k") || (event.body.toLowerCase() == "ke")) {
     return api.sendMessage("️Your Grandfather 😑🫶🫶", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "guyz") || (event.body.toLowerCase() == "guys")) {
     return api.sendMessage("️Don't Call Me Guys Bcz I AM Yours😊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "wife") || (event.body.toLowerCase() == "bou")) {
     return api.sendMessage("️Yes, My Husband🥰", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "@everyone") || (event.body.toLowerCase() == "Sobai kemon aso") || (event.body.toLowerCase() == "সবাই কেমন আছেন")) {
     return api.sendMessage("️সবার সাতে কথা বল্লে আমার সাতে কথা বলা লাগবেনা তোমাদের 🙄", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "আসসালামু আলাইকুম") || (event.body.toLowerCase() == "Assalamualaikum") || (event.body.toLowerCase() == "Assalamu alaikum")) {
     return api.sendMessage("️Wlaikumsalam 🙌", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Bra")) {
     return api.sendMessage("️But I Am Girl, You Can Call Me Maya", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Boy")) {
     return api.sendMessage("️bbe, I Am Girl 😑", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "Welcome") || (event.body.toLowerCase() == "Wlc")) {
     return api.sendMessage("️Most welcome 💛", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "Baby")) {
     return api.sendMessage("️bolo Baby 😚🖤", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "bebe")) {
     return api.sendMessage("hmm Babe 😚🖤", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "fight") || (event.body.toLowerCase() == "fyt")) {
     return api.sendMessage("️Sorry, We Are Peace Lover ✌🏻🕊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Mim koi") || (event.body.toLowerCase() == "Mim suna") || (event.body.toLowerCase() == "Mim aso")) {
     return api.sendMessage("️হুম বলো সুনা কি বলবা 🤭", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "rana vai") || (event.body.toLowerCase() == "Rana vai")) {
     return api.sendMessage("️Boss Ekhon Busy Ase Okay 😑", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "who are you") || (event.body.toLowerCase() == "who r u")) {
     return api.sendMessage("️I Am R4N4-BOT, An AI Based Messenger Chatbot.", threadID, messageID);
   };

  if (event.body.indexOf("Mim") == 0 || (event.body.toLowerCase() == "mim") || (event.body.indexOf("মিম") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
