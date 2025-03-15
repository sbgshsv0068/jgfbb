const axios = require("axios");
module.exports = {
	config: {
		name: "ip",
		version: "1.0",
		author: "MR.AYAN",
		countDown: 30,
		role: 0,
		shortDescription: "get ip address info",
		longDescription: "",
		category: "group",
		guide: {
			en: "{pn} your ip",
		}
	},

  onStart: async function ({ api, event, args, utils }) {
    if (!args.join("")) {
      api.sendMessage("𝗬𝗼𝘂 𝗠𝘂𝘀𝘁 𝗘𝗻𝘁𝗲𝗿 𝗜𝗣", event.threadID, event.messageID);
    } else {
      var data = (await axios.get(`http://ip-api.com/json/${args.join(" ")}`)).data;
      if (data.status == "fail") {
        api.sendMessage("𝗧𝗵𝗶𝘀 𝗜𝗣 𝗔𝗱𝗿𝗲𝘀𝘀 𝗖𝗼𝘂𝗹𝗱 𝗡𝗼𝘁 𝗕𝗲 𝗙𝗼𝘂𝗻𝗱 !", event.threadID);
      } else {
        api.sendMessage(
          {
            body: `=====✅${data.status}✅=====\n🌍Continent: \n🏷Region Name: ${data.regionName}\nCountry:${data.country}\n🗺️Region: ${data.region}\n🏞City: ${data.city}\n🏛Country Code: ${data.countryCode}\n⛽️Zip Code: ${data.zip}\n⏱Timezone: ${data.timezone}\n💵Currency: ${data.currency}\n📉Longitude: ${data.lon}\n📈Latitude: ${data.lat}\n 🔍Organization Name: ${data.org}\n👀Query: ${data.query}\n`,
            location: {
              latitude: data.lat,
              longitude: data.lon,
              current: true,
            },
          },
          event.threadID
        );
      }
    }
  },
};
