module.exports = {
    config: {
        name: "oii",
        version: "1.0",
        author: "MR.AYAN", //** Original author FB ID: https://m.me/MR.AYAN.2X **//
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply"
    },

    onStart: async function () {},

    onChat: async function ({ event, message }) {
        if (event.body && event.body.toLowerCase() === "oii") {
            return message.reply("ওইই! 🙄 আবার কি চাই? খেয়ে দেয়ে কাজ নাই, শুধু আমাকে ডাকো 😑… আচ্ছা বলো, এবার কি কাণ্ড ঘটাইলা? 🤔🔥");
        }
    }
};
