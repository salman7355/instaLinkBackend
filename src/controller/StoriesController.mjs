import {
  addStoriestoTempTable,
  addstory,
  deleteFromtemptable,
  getstories,
} from "../services/StoriesSevice.mjs";

export const addStory = async (req, res) => {
  const { userId, story } = req.body;
  try {
    if (!userId || !story) {
      return res.status(400).json({ error: "Invalid data" });
    }

    await addstory(userId, story);
    const newStory = await addStoriestoTempTable(userId, story);

    setTimeout(async () => {
      await deleteFromtemptable(newStory.id);
    }, 300000); // Delete story after 5 mins

    return res.status(201).json("Story added successfully");
  } catch (error) {
    console.error(error.message);
  }
  try {
  } catch (error) {
    console.error(error.message);
  }
};

export const getStories = async (req, res) => {
  const { userId } = req.params;
  try {
    const stories = await getstories(userId);
    return res.status(200).send(stories);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};
