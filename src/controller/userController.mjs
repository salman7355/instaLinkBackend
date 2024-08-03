import { createUser, getUserByEmail } from "../services/userService.mjs";

export const CreateUser = async (req, res) => {
  const { username, email, password, profilepictureurl } = req.body;
  try {
    if (!username || !email || !password || !profilepictureurl) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await createUser(username, email, password, profilepictureurl);
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
