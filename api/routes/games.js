import express from "express";
import {
  getGameCount,
  downGameCount,
  getUserGames,
} from "../controllers/game.js";

const router = express.Router();

router.get("/", getGameCount);
router.post("/", downGameCount);
router.get("/:userId", getUserGames);

export default router;
