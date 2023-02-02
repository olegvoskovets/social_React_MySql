import { db } from "../connect.js";

export const getLikesCommentId = (req, res) => {
  // const q = `SELECT p.id, p.title,p.image,p.last_update,u.name,u.profilePic
  //  FROM posts AS p
  // INNER JOIN users AS u
  //  ON p.userId=u.id

  // ORDER BY p.last_update DESC`;

  //   const q3 = `SELECT c.*,u.name,u.profilePic FROM comments AS c
  //               JOIN users AS u ON c.userId=u.id WHERE c.postId=?`;
  const q = `SELECT  u.name, u.profilePic ,l.commentId FROM users AS u
             JOIN likes_comment AS l
             ON u.id=l.userId WHERE l.commentId= ? `;
  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addLikesComment = (req, res) => {
  //перевіряємо може user вже ставив like цьому посту
  //якщо так то like видаляємо
  let q = `SELECT * FROM likes_comment WHERE commentId=? AND userId=?`;
  db.query(q, [req.body.commentId, req.body.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const like_id = data[0].id;

      q = `DELETE FROM likes_comment WHERE id=${like_id} `;
      db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);

        return res
          .status(200)
          .json("Такий like на цей комент вже існував і його видалили!");
      });
    } else {
      q = "INSERT INTO likes_comment (`commentId`,`userId`) VALUE (?)";

      const value = [req.body.commentId, req.body.userId];
      db.query(q, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Новий like створено");
      });
    }
  });
};
