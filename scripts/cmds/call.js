module.exports = {
  config: {
    name: "call",
    aliases: ["report", "calling"],
    version: "9.9",
    author: "SK-SIDDIK-KHAN",
    countDown: 1,
    role: 0,
    description: "Add my owner into this group.",
    category: "Admins",
    usages: "user",
  },

  onStart: async function ({ api, message, event }) {
    const { threadID, messageID } = event;
    const botID = api.getCurrentUserID();
    const targetUserID = "100063487970328";
    const targetUserName = "Mohammad Rana ";

    // Utility function to send messages with optional mentions
    const sendMessage = (msg, mentions = []) => api.sendMessage({ body: msg, mentions }, threadID, messageID);

    try {
      // Fetch thread info to check participants, approval mode, and admins
      const { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
      const participants = participantIDs.map(id => parseInt(id)); // Convert participant IDs to integers
      const admins = adminIDs.map(admin => parseInt(admin.id)); // Convert admin IDs to integers

      // Check if the target user is already in the group
      if (participants.includes(parseInt(targetUserID))) {
        return sendMessage(
          `𝗠𝘆 𝗕𝗼𝘀𝘀 𝗜𝘀 𝗔𝗹𝗿𝗲𝗮𝗱𝘆 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽 ✅\n\n⚡ 𝗝𝘂𝘀𝘁 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 @${targetUserName}.`,
          [{ id: targetUserID, tag: targetUserName }]
        );
      }

      // Add the target user to the group
      await api.addUserToGroup(parseInt(targetUserID), threadID);

      // Check the approval mode and send appropriate response
      if (approvalMode && !admins.includes(botID)) {
        return sendMessage(
          `𝗠𝘆 𝗕𝗼𝘀𝘀 𝗛𝗮𝘀 𝗕𝗲𝗲𝗻 𝗔𝗱𝗱𝗲𝗱 𝗧𝗼 𝗧𝗵𝗲 𝗔𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝗹𝗶𝘀𝘁 ✅.`,
          [{ id: targetUserID, tag: targetUserName }]
        );
      } else {
        return sendMessage(
          `𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗔𝗱𝗱𝗲𝗱 𝗠𝘆 𝗕𝗼𝘀𝘀 𝗧𝗼 𝗬𝗼𝘂𝗿 𝗚𝗿𝗼𝘂𝗽 ✅.`,
          [{ id: targetUserID, tag: targetUserName }]
        );
      }
    } catch (error) {
      // Catch any errors and log them, then send failure message
      console.error("Error adding user to group:", error);
      return sendMessage("Failed to add the user to the group ❎");
    }
  },
};
