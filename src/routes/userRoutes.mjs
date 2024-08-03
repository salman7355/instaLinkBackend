import express from "express";
import { CreateUser, Login } from "../controller/userController.mjs";

const router = express.Router();

router.post("/register", CreateUser);

router.post("/login", Login);

router.get("/getUser", (req, res) => {
  res.send("Hello aaaWorld");
});

export default router;
