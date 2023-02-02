import express from "express";
import { uploadFile } from "../controllers/uploadFile.js";

const router = express.Router();

router.post("/upload", uploadFile);

export default router;
