import { Expo } from "expo-server-sdk";
import { getTokenbyUserId } from "../services/postService.mjs";

const expo = new Expo();

export const sendNotification = async (userId, title, body, data) => {
  // userId sa7b elpost
  // body elmessage
  // data.type eltype
  // actorId ely 3ml elaction => userId

  const token = await getTokenbyUserId(userId);
  try {
    await expo.sendPushNotificationsAsync([
      {
        to: token,
        sound: "default",
        title: title,
        body: body,
        data: data,
      },
    ]);
  } catch (error) {
    console.error(error.message);
  }
};
