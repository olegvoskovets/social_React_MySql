import express from "express";
import {
  getAllPosts,
  addPost,
  getOfPost,
  updatePostId,
  deletePostId,
} from "../controllers/post.js";

const router = express.Router();

//router.get("/profile/:userId", getUser);
router.get("/", getAllPosts);
router.get("/:userId", getOfPost);
router.post("/", addPost);
router.put("/:postId", updatePostId);
router.delete("/:postId", deletePostId);

export default router;
