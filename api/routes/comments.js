import express from "express";
import {
  getCommentsPost,
  getCommentsParams,
  addComment,
  deleteComment,
  updateCommentId,
} from "../controllers/comment.js";

const router = express.Router();

//router.get("/profile/:userId", getUser);
router.get("/", getCommentsPost);
router.get("/:postId", getCommentsParams);
router.post("/", addComment);
router.delete("/:commentId", deleteComment);
router.put("/:commentId", updateCommentId);
//router.put("/", updateUser);

export default router;
