const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "post",
    version: "1.0",
    author: "jfhigtfdv",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Create a new post on Facebook."
    },
    longDescription: {
      en: "Create a new post on Facebook with text, images, and video."
    },
    category: "config",
    guide: {
      en: "{pn}: post"
    }
  },

  onStart: async function ({ event, api, commandName }) {
    const { threadID, messageID, senderID } = event;
    const uuid = getGUID();
    const formData = {
      "input": {
        "composer_entry_point": "inline_composer",
        "composer_source_surface": "timeline",
        "idempotence_token": uuid + "_FEED",
        "source": "WWW",
        "attachments": [],
        "audience": {
          "privacy": {
            "allow": [],
            "base_state": "FRIENDS", // SELF EVERYONE
            "deny": [],
            "tag_expansion_state": "UNSPECIFIED"
          }
        },
        "message": {
          "ranges": [],
          "text": ""
        },
        "with_tags_ids": [],
        "inline_activities": [],
        "explicit_place_id": "0",
        "text_format_preset_id": "0",
        "logging": {
          "composer_session_id": uuid
        },
        "tracking": [
          null
        ],
        "actor_id": api.getCurrentUserID(),
        "client_mutation_id": Math.floor(Math.random() * 17)
      },
      "displayCommentsFeedbackContext": null,
      "displayCommentsContextEnableComment": null,
      "displayCommentsContextIsAdPreview": null,
      "displayCommentsContextIsAggregatedShare": null,
      "displayCommentsContextIsStorySet": null,
      "feedLocation": "TIMELINE",
      "feedbackSource": 0,
      "focusCommentID": null,
      "gridMediaWidth": 230,
      "groupID": null,
      "scale": 3,
      "privacySelectorRenderLocation": "COMET_STREAM",
      "renderLocation": "timeline",
      "useDefaultActor": false,
      "inviteShortLinkKey": null,
      "isFeed": false,
      "isFundraiser": false,
      "isFunFactPost": false,
      "isGroup": false,
      "isTimeline": true,
      "isSocialLearning": false,
      "isPageNewsFeed": false,
      "isProfileReviews": false,
      "isWorkSharedDraft": false,
      "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
      "hashtag": null,
      "canUserManageOffers": false
    };

    return api.sendMessage(`𝐂𝐡𝐨𝐨𝐬𝐞 𝐀𝐧 𝐀𝐮𝐝𝐢𝐞𝐧𝐜𝐞\n𝟷. 𝙴𝚟𝚛𝚢𝚘𝚗𝚎\n𝟸. 𝙵𝚛𝚒𝚎𝚗𝚍\n𝟹. 𝙾𝚗𝚕𝚢 𝙼𝚎`, threadID, (e, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: senderID,
        formData,
        type: "whoSee"
      });
    }, messageID);
  },
  onReply: async function ({ Reply, event, api, commandName }) {
    const handleReply = Reply;
    const { type, author, formData } = handleReply;
    if (event.senderID != author) return;

    const { threadID, messageID, attachments, body } = event;
    const botID = api.getCurrentUserID();

    async function uploadAttachments(attachments) {
      let uploads = [];
      for (const attachment of attachments) {
        const form = {
          file: attachment
        };
        uploads.push(api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form));
      }
      uploads = await Promise.all(uploads);
      return uploads;
    }

    if (type == "whoSee") {
      if (!["1", "2", "3"].includes(body)) return api.sendMessage('Please choose one of the three options above', threadID, messageID);
      formData.input.audience.privacy.base_state = body == 1 ? "EVERYONE" : body == 2 ? "FRIENDS" : "SELF";
      api.unsendMessage(handleReply.messageID, () => {
        api.sendMessage(`-𝘙𝘦𝘱𝘭𝘺 𝘛𝘰 𝘛𝘩𝘪𝘴 𝘔𝘢𝘢𝘴𝘴𝘢𝘨𝘦 𝘞𝘩𝘵𝘢 𝘠𝘰𝘶 𝘞𝘢𝘯𝘵 𝘛𝘰 𝘗𝘰𝘴𝘵. 🎀\n𝘐𝘧 𝘠𝘰𝘶 𝘞𝘢𝘯𝘵 𝘛𝘰 𝘓𝘦𝘢𝘷𝘦 𝘐𝘵 𝘉𝘭𝘢𝘯𝘬 𝘛𝘰 𝘙𝘦𝘱𝘭𝘺 0.`, threadID, (e, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: author,
            formData,
            type: "content"
          });
        }, messageID);
      });
    } else if (type == "content") {
      if (event.body != "0") formData.input.message.text = event.body;
      api.unsendMessage(handleReply.messageID, () => {
        api.sendMessage(`Reply to this message with a photo or video (you can send multiple attachments). To post without attachments, reply with 0.`, threadID, (e, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: author,
            formData,
            type: "media"
          });
        }, messageID);
      });
    } else if (type == "media") {
      if (event.body != "0") {
        const allStreamFile = [];
        for (const attach of attachments) {
          if (attach.type === "photo") {
            const getFile = (await axios.get(attach.url, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/imagePost.png`, Buffer.from(getFile));
            allStreamFile.push(fs.createReadStream(__dirname + `/cache/imagePost.png`));
          } else if (attach.type === "video") {
            const videoFile = await axios.get(attach.url, { responseType: "stream" });
            const videoPath = __dirname + `/cache/videoPost.mp4`;
            videoFile.data.pipe(fs.createWriteStream(videoPath));
            allStreamFile.push(fs.createReadStream(videoPath));
          }
        }
        const uploadFiles = await uploadAttachments(allStreamFile);
        for (let result of uploadFiles) {
          if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));

          if (result.payload && result.payload.fbid) {
            formData.input.attachments.push({
              "photo": {
                "id": result.payload.fbid.toString(),
              }
            });
          }
        }
      }

      const form = {
        av: botID,
        fb_api_req_friendly_name: "ComposerStoryCreateMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "7711610262190099",
        variables: JSON.stringify(formData)
      };

      api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
        api.unsendMessage(handleReply.messageID);
        try {
          if (e) throw e;
          if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
          const postID = info.data.story_create.story.legacy_story_hideable_id;
          const urlPost = info.data.story_create.story.url;
          if (!postID) throw info.errors;
          try {
            fs.unlinkSync(__dirname + "/cache/imagePost.png");
            fs.unlinkSync(__dirname + "/cache/videoPost.mp4");
          } catch (e) {}
          return api.sendMessage(`» 𝗣𝗼𝘀𝘁 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 ✅\n» 𝗣𝗼𝘀𝘁 𝗜𝗱: ${postID}\n» 𝗣𝗼𝘀𝘁 𝗨𝗿𝗹: ${urlPost}`, threadID, messageID);
        } catch (e) {
          // Handle any errors that may occur during the post creation.
          return api.sendMessage(`𝗣𝗼𝘀𝘁 𝗖𝗿𝗲𝗮𝘁𝗶𝗼𝗻 𝗙𝗮𝗶𝗹𝗲𝗱 ❌, 𝗣𝗹𝗲𝗮𝘀𝗲 𝗧𝗿𝘆 𝗔𝗴𝗮𝗶𝗻 𝗟𝗮𝘁𝗲𝗿`, threadID, messageID);
        }
      });
    }
  }
};

function getGUID() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
  }
