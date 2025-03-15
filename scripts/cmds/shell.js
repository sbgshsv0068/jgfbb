const util = require('util');
const exec = util.promisify(require('child_process').exec);
 
module.exports = {
  config: {
    name: 'shell',
    aliases: ['$','×'],
    version: '1.0',
    author: 'MR.AYAN',
    role: 2,
    category: 'utility',
    shortDescription: {
      en: '📑 𝗘𝘅𝗲𝗰𝘂𝘁𝗲𝘀 𝗧𝗲𝗿𝗺𝗶𝗻𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀.',
    },
    longDescription: {
      en: '📑 𝗘𝘅𝗲𝗰𝘂𝘁𝗲𝘀 𝗧𝗲𝗿𝗺𝗶𝗻𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗔𝗻𝗱 𝗥𝗲𝘁𝘂𝗿𝗻𝘀 𝗧𝗵𝗲 𝗢𝘂𝘁𝗽𝘂𝘁.',
    },
    guide: {
      en: '{pn} [command]',
    },
  },
  onStart: async function ({ api, args, message, event }) {
    if (args.length === 0) {
      message.reply('Usage: {pn} [command]');
      return;
    }
 
    const command = args.join(' ');
 
    try {
      const { stdout, stderr } = await exec(command);
 
      if (stderr) {
        message.send(`${stderr}`);
      } else {
        message.send(`${stdout}`);
      }
    } catch (error) {
      console.error(error);
      message.reply(`Error: ${error.message}`);
    }
  },
}; 
 
