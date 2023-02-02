import express from "express";
import {
  getAllFriendUserId,
  getAllFriendUserIdRequests,
  confirmRequestsFriend,
  deleteRequestFriend,
  commonFriends,
} from "../controllers/friend.js";

const router = express.Router();

router.get("/list/:userId", getAllFriendUserId);
router.post("/", commonFriends); //спільні друзі
router.get("/requests/:userId", getAllFriendUserIdRequests);
router.put("/requests/:id", confirmRequestsFriend); //confirm requests
router.delete("/requests/:id", deleteRequestFriend);

export default router;
