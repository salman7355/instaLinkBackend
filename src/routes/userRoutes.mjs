import express from "express";
import {
  CreateUser,
  GetUserById,
  Login,
  SearchUser,
  updateUser,
} from "../controller/userController.mjs";

const router = express.Router();

router.post("/register", CreateUser);
router.post("/login", Login);
router.get("/search/:username", SearchUser);
router.get("/user/:id", GetUserById);
router.put("/update/:id", updateUser);

export default router;
