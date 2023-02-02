import { db } from "../connect.js";
import jwt from "jsonwebtoken";
//DELETE FROM `snake_game`.`comments` WHERE (`id` = '3')

export const deleteComment = (req, res) => {
  const q = `DELETE FROM comments AS c WHERE c.id = ?`;

  db.query(q, [req.params.commentId], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log();
    return res.status(200).json("Коментарій видалено");
  });
};

export const updateCommentId = (req, res) => {
  const q = "UPDATE comments SET `comment`=?, `last_updated`=?  WHERE `id`=?";
  const values = [req.body.comment, new Date()];

  db.query(q, [...values, req.params.commentId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json("Comment updated.");
  });
};

export const addComment = (req, res) => {
  const q =
    "INSERT INTO comments (`comment`,`postId`,`userId`,`creation_date`) VALUE (?)";
  const values = [
    req.body.comment,
    req.body.postId,
    req.body.userId,
    new Date(),
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Новий комент створено");
  });
};

export const getCommentsParams = (req, res) => {
  // const q = `SELECT c.* FROM comments AS c  WHERE c.postId =?`;
  const q2 = `SELECT c.*,u.name,u.profilePic FROM comments AS c 
    JOIN users AS u ON c.userId=u.id WHERE c.postId=?`;

  db.query(q2, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// select * from Orders
// join Customers on Orders.CustomerID = Customers.CustomerID
// where Customers.CustomerID >10

export const getCommentsPost = (req, res) => {
  // const q = `SELECT * FROM comments  WHERE comments.postId= ${req.body.id} `;
  // const value = req.body;
  // console.log("body= ", value);
  // db.query(q, [], (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.status(200).json(data);
  // });
};
// `SELECT u.name ,u.profilePic,u.id, MAX(g.count)  AS count
//               FROM users AS u
//               INNER JOIN games AS g ON u.id=g.userId
//               GROUP BY u.name, u.profilePic,u.id
//               ORDER BY count DESC LIMIT 5`;
//  , p.id=c.postId
