import express from "express";
import {
  CreateUser,
  Login,
  SearchUser,
} from "../controller/userController.mjs";

const router = express.Router();

router.post("/register", CreateUser);

router.post("/login", Login);

router.get("/search/:username", SearchUser);

export default router;
