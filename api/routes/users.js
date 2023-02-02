import express from "express";
import {
  getUserProfile,
  getAllUsers,
  updateUser,
  getUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/profile/:userId", getUserProfile);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/", updateUser);

export default router;
