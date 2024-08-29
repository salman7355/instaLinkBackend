import { addusertosearchhistory } from "../services/SearchHistoryService.mjs";
import {
  createUser,
  getUserByEmail,
  getuserbyid,
  searchUser,
} from "../services/userService.mjs";

export const CreateUser = async (req, res) => {
  const { username, email, password, profilepictureurl, dateofbirth, mobile } =
    req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      !profilepictureurl ||
      !dateofbirth ||
      !mobile
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await createUser(
      username,
      email,
      password,
      profilepictureurl,
      dateofbirth,
      mobile
    );
    return res.status(201).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const SearchUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    const user = await searchUser(username);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const GetUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getuserbyid(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};
