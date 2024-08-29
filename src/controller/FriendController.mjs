import { Expo } from "expo-server-sdk";
import {
  addfriend,
  checkFriend,
  decrementFollowers,
  decrementFollowing,
  getfriends,
  incrementFollowers,
  incrementFollowing,
  removefriend,
} from "../services/FriendService.mjs";
import { getTokenbyUserId } from "../services/postService.mjs";
import { sendNotification } from "../utils/Notification.mjs";

const expo = new Expo();

export const AddFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    if (!user_id || !friend_id) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const friend = await checkFriend(user_id, friend_id);
    if (friend) {
      return res.status(400).josn({ error: "Friend already added" });
    }

    await addfriend(user_id, friend_id);
    await incrementFollowing(user_id);
    await incrementFollowers(friend_id);

    const message = {
      title: "New Friend Request",
      body: "You have a new friend request",
      data: { type: "friend_request" },
    };

    await sendNotification(
      friend_id,
      message.title,
      message.body,
      message.data
    );

    // const friendToken = await getTokenbyUserId(friend_id);
    // if (friendToken.length > 0) {
    //   const message = {
    //     title: "New Friend Request",
    //     body: "You have a new friend request",
    //     data: { type: "friend_request" },
    //   };
    //   await expo.sendPushNotificationsAsync([
    //     {
    //       to: friendToken,
    //       sound: "default",
    //       title: message.title,
    //       body: message.body,
    //       data: message.data,
    //     },
    //   ]);
    // }

    return res.status(201).json("Friend added successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const RemoveFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    if (!user_id || !friend_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    await removefriend(user_id, friend_id);
    await decrementFollowing(user_id);
    await decrementFollowers(friend_id);
    return res.status(200).json("Friend removed successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const GetFriends = async (req, res) => {
  const { user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const friends = await getfriends(user_id);
    return res.status(200).send(friends);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const checkfriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    if (!user_id || !friend_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (user_id === friend_id) {
      return res.status(200).json({ friends: "same" });
    }

    const friend = await checkFriend(user_id, friend_id);
    if (!friend) {
      return res.status(200).json({ friends: "false" });
    }
    return res.status(200).json({ friends: "true" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
