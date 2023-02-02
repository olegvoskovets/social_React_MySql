import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getOfPost = (req, res) => {
  const q = `SELECT p.*,u.name,u.profilePic ,us.name AS name_post_on_the_user_page,
  us.profilePic AS post_on_the_user_page_profilePic
  FROM posts AS p 
  INNER JOIN users AS u
  INNER JOIN users AS us
  ON p.userId=u.id AND p.post_on_the_user_page=us.id 
  WHERE p.userId =? OR  p.post_on_the_user_page=?
  ORDER BY p.creation_post DESC`;
  db.query(q, [req.params.userId, req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const updatePostId = (req, res) => {
  const q =
    "UPDATE posts SET `userId`=?,`post_on_the_user_page`=?,`title`=?,`image`=?,`last_update`=? WHERE `id`=? ";

  const values = [
    req.body.userId,
    req.body.post_on_the_user_page,
    req.body.title,
    req.body.image,
    new Date(),
  ];
  db.query(q, [...values, req.params.postId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Пост змінено.");
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts (`userId`,`post_on_the_user_page`,`title`,`image`,`creation_post`) VALUE (?)";
  const values = [
    req.body.userId,
    req.body.post_on_the_user_page,
    req.body.title,
    req.body.image,
    new Date(),
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Новий пост создан .");
  });
};

export const getAllPosts = (req, res) => {
  const q = `SELECT p.id, p.title,p.image,p.last_update, p.post_on_the_user_page,p.userId,u.name,u.profilePic,
  us.name AS name_post_on_the_user_page,
   us.profilePic AS post_on_the_user_page_profilePic
             FROM posts AS p 
             INNER JOIN users AS u 
             INNER JOIN users AS us
             ON p.userId=u.id AND p.post_on_the_user_page=us.id             
             ORDER BY p.creation_post DESC`;

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deletePostId = (req, res) => {
  const q = `DELETE FROM posts WHERE posts.id=?`;

  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Пост видалено.");
  });
};
// `SELECT u.name ,u.profilePic,u.id, MAX(g.count)  AS count
//               FROM users AS u
//               INNER JOIN games AS g ON u.id=g.userId
//               GROUP BY u.name, u.profilePic,u.id
//               ORDER BY count DESC LIMIT 5`;
//  , p.id=c.postId
