import express from "express";
import {
  getLikesCommentId,
  addLikesComment,
} from "../controllers/likesComment.js";

import { getLikesPostId, addLikesPost } from "../controllers/likesPost.js";

const router = express.Router();

//router.get("/profile/:userId", getUser);
router.get("/comment/:postId", getLikesCommentId);
router.get("/postLikes/:postId", getLikesPostId);
router.post("/comment", addLikesComment);
router.post("/postLikes/", addLikesPost);
//router.put("/", updateUser);

export default router;
