import express from "express";
import {
  getAllFriendUserId,
  getAllFriendUserIdRequests,
  confirmRequestsFriend,
  deleteRequestFriend,
  commonFriends,
  orFriends,
  getRequestsFriend,
  inviteToBeFriends,
  deleteFriend,
} from "../controllers/friend.js";

const router = express.Router();

router.get("/list/:userId", getAllFriendUserId);
router.post("/", commonFriends); //спільні друзі
router.post("/or_friends", orFriends);
router.post("/invite", inviteToBeFriends);
router.post("/getRequestsFriend", getRequestsFriend);
router.get("/requests/:userId", getAllFriendUserIdRequests);
router.put("/requests/:id", confirmRequestsFriend); //confirm requests
router.delete("/requests/:id", deleteRequestFriend);
router.delete("/", deleteFriend);

export default router;
