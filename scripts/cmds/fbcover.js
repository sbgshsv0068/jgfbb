const axios = require('axios');
const fs = require('fs-extra');
const jimp = require('jimp');
module.exports.config = {
name: "fbcover",
  version: "6.9",
  role: 0,
  author: "Dipto",
  description: "Facebook cover",
  category: "Cover", 
  guide:{en: "name - title - address - email - phone - color (default = white)"},
  coolDowns: 5
};
module.exports.onStart = async function({ api, event, args, usersData}) { 
const dipto = args.join(" "); 
  let id;
  if (event.type === 'message_reply') {
      id = event.messageReply.senderID;
  } else {
      id = Object.keys(event.mentions)[0] ||  event.senderID;
  }
  const data = await usersData.get(id);
  const nam = data.name;
if (!dipto) { 
  return api.sendMessage(`❤️𝐏𝐥𝐞𝐚𝐬𝐞 𝐓𝐫𝐲 💛\n\n ${global.GoatBot.config.prefix}fbcover v1•v2•v3•v4 - name - title - address - email - phone - color \n\n💜𝐓𝐨𝐭𝐚𝐥 𝟏𝟎+̲💚\n\n【/】𝐑𝟒𝐍𝟒•𝐁𝐎𝐓__//💛🤍`, event.threadID,event.messageID); 
} 
else { 
  const msg = dipto.split("-"); 
  const v = msg[0].trim() || "v1";
  const name = msg[1].trim() || " "; 
  const subname = msg[2].trim() || " "; 
  const address = msg[3].trim() || " "; 
  const email = msg[4].trim() || " "; 
  const phone = msg[5].trim() || " "; 
  const color = msg[6].trim() || "white" ;
api.sendMessage(`⏳| 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭...️`, event.threadID,
  (err, info) => 
  setTimeout(() => { api.unsendMessage(info.messageID) 
        }, 4000));
  const img = `https://noobs-api2.onrender.com/dipto/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`; 
  
  try { 
const response = await axios.get(img, { responseType: 'arraybuffer' }); 
const image = await jimp.read(response.data); 
const Path = `./dipto_${id}.png`; 
  await image.writeAsync(Path); 
const attachment = fs.createReadStream(Path);
       api.sendMessage({ body: `╔════•|𝐑𝟒𝐍𝟒•𝐁𝐎𝐓|•════╗\n\n❤️𝗙𝗜𝗥𝗦𝗧 𝗡𝗔𝗠𝗘: ${name}\n\n🤍𝗦𝗘𝗖𝗢𝗡𝗗 𝗡𝗔𝗠𝗘:${subname}\n\n💚𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${address}\n\n💜𝗠𝗔𝗜𝗟: ${email}\n\n💛𝗣𝗛𝗢𝗡𝗘 𝗡𝗢.: ${phone}\n\n☢💙𝗖𝗢𝗟𝗢𝗥: ${color}\n\n💖𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${nam}\n\n🖤𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : ${v}\n\n╚════•|𝐑𝟒𝐍𝟒•𝐁𝐎𝐓|•════╝`,attachment
}, event.threadID, () => fs.unlinkSync(Path), event.messageID); 
      } catch (error) { 
    console.error(error); 
    api.sendMessage("An error occurred while generating the FB cover.", event.threadID); 
  }
}
}
