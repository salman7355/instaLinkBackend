import {
  addusertosearchhistory,
  checkIfUserExistsInSearchHistory,
  clearsearchHistory,
  getsearchhistory,
} from "../services/SearchHistoryService.mjs";

export const getUsersFromSearchHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await getsearchhistory(userId);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const addusertoSearchHistory = async (req, res) => {
  const { userId, searchedUserId } = req.body;

  try {
    if (!userId || !searchedUserId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (userId === searchedUserId) {
      return res.status(400).json({ error: "You can't search yourself" });
    }

    const userExists = await checkIfUserExistsInSearchHistory(
      userId,
      searchedUserId
    );
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists in search history" });
    }

    const user = await addusertosearchhistory(userId, searchedUserId);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const clearSearchHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    await clearsearchHistory(userId);
    return res.status(200).json({ message: "Search history cleared" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
