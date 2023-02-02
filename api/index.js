import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
//import patsh from "../client/public/upload";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

import userRoutes from "./routes/users.js";
import gameRoutes from "./routes/games.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import friendsRoutes from "./routes/friends.js";
//import fileRoutes from "./routes/files.js";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/friends", friendsRoutes);

//app.use("/api", fileRoutes);

app.listen(8800, () => {
  console.log("Server started ...");
});
