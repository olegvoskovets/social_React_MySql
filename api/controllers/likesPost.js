import { db } from "../connect.js";

export const getLikesPostId = (req, res) => {
  // const q = `SELECT p.id, p.title,p.image,p.last_update,u.name,u.profilePic
  //  FROM posts AS p
  // INNER JOIN users AS u
  //  ON p.userId=u.id

  // ORDER BY p.last_update DESC`;

  //   const q3 = `SELECT c.*,u.name,u.profilePic FROM comments AS c
  //               JOIN users AS u ON c.userId=u.id WHERE c.postId=?`;
  const q = `SELECT  u.name, u.profilePic  FROM users AS u
             JOIN likes_post AS l
             ON u.id=l.userId WHERE l.postId= ? `;
  db.query(q, [req.params.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addLikesPost = (req, res) => {
  //перевіряємо може user вже ставив like цьому посту
  //якщо так то like видаляємо
  let q = `SELECT * FROM likes_post WHERE postId=? AND userId=?`;
  db.query(q, [req.body.postId, req.body.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const like_id = data[0].id;

      q = `DELETE FROM likes_post WHERE id=${like_id} `;
      db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);

        return res
          .status(200)
          .json("Такий like на цей пост вже існував і його видалили!");
      });
    } else {
      q = "INSERT INTO likes_post (`postId`,`userId`) VALUE (?)";

      const value = [req.body.postId, req.body.userId];
      db.query(q, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Новий like створено");
      });
    }
  });
};
