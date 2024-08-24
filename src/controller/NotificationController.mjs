import { Expo } from "expo-server-sdk";
import {
  findTokenByUserId,
  savetoken,
  updateToken,
} from "../services/NotificationService.mjs";

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
