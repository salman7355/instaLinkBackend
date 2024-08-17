import express from "express";
import {
  CreateUser,
  GetUserById,
  Login,
  SearchUser,
} from "../controller/userController.mjs";

const router = express.Router();

router.post("/register", CreateUser);

router.post("/login", Login);

router.get("/search/:username", SearchUser);

router.get("/user/:id", GetUserById);

export default router;
