import { Expo } from "expo-server-sdk";
import {
  findTokenByUserId,
  getnotifications,
  markAllNotificationsAsread,
  readnotification,
  savetoken,
  updateToken,
} from "../services/NotificationService.mjs";
import { query } from "../config/db.mjs";
import { getuserbyid } from "../services/userService.mjs";

const expo = new Expo();

export const SaveToken = async (req, res) => {
  const { user_id, token } = req.body;

  if (!user_id || !token) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    const existingToken = await findTokenByUserId(user_id);

    if (existingToken) {
      // Update the existing token
      await updateToken(user_id, token);
      return res.status(200).json("Token updated successfully");
    } else {
      // Insert the new token
      await savetoken(user_id, token);
      return res.status(201).json("Token saved successfully");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const sample = async (req, res) => {
  const { token } = req.body;
  expo.sendPushNotificationsAsync([
    {
      to: token,
      title: "Hello",
      body: "World",
    },
  ]);
  return res.status(200).send("Notification sent successfully");
};

// export const insertNotification = async (req, res) => {
//   const { postId, actorId, type } = req.body;

//   if (!postId || !actorId || !type) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const PostOwnerId = await getPostOwner(postId);
//   // console.log(PostOwnerId);

//   if (!PostOwnerId) {
//     return res.status(404).json({ error: "Post not found" });
//   }

//   const Actor = await getuserbyid(actorId);
//   // console.log(Actor);

//   if (!Actor) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   let message = "";

//   if (type === "like") {
//     message = `${Actor.username} liked your post`;
//   } else if (type === "comment") {
//     message = `${Actor.username} commented on your post`;
//   }

//   try {
//     await insertnotification(
//       PostOwnerId.userid,
//       actorId,
//       postId,
//       type,
//       message
//     );
//     return res.status(201).json("Notification inserted successfully");
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

export const readNotification = async (req, res) => {
  const { notificationId } = req.body;

  if (!notificationId) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  try {
    await readnotification(notificationId);
    return res.status(200).json("Notification read successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const markAllAsRead = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const notifications = await getnotifications(userId);

  if (notifications.length === 0) {
    return res.status(404).json({ error: "No notifications found" });
  }

  try {
    await markAllNotificationsAsread(userId);
    return res.status(200).json("All notifications marked as read");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const notifications = await getnotifications(userId);
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
