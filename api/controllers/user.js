import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserProfile = (req, res) => {
  const q = `SELECT * FROM users WHERE users.id =?`;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const q = `SELECT name,email,profilePic,city,website FROM users WHERE users.id =?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getAllUsers = (req, res) => {
  const q = "SELECT * FROM users ";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  //console.log("update: ", req.body);

  //if (!token) return res.status(401).json("Ви не авторизовані  !");
  //jwt.verify(token, "secretkey", (err, userInfo) => {
  // console.log("userInfo: ", userInfo);
  // if (err) return res.status(403).json("Токен не валiдний !");
  const q =
    // `UPDATE users SET   name = ?,email = ?,city = ?,website = ?,profilePic = ?,coverPic = ? WHERE id = ? `;
    ` UPDATE users SET   name = '${req.body.name}' ,email = '${req.body.email}',city = '${req.body.city}',website ='${req.body.website}',profilePic = '${req.body.profilePic}',coverPic = '${req.body.coverPic}' WHERE id = '${req.body.id}'   `;
  //"UPDATE users SET name='Pavel_update', email='pavelgg@ukr.net' WHERE id=3 ";
  //"INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
  //console.log("BODY ", req.body);

  const values = [
    req.body.name,
    req.body.email,
    req.body.city,
    req.body.website,
    req.body.profilePic,
    req.body.coverPic,
    req.body.id,
  ];

  db.query(
    q,
    [],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.affectedRows > 0) return res.json("Usera успішно оновлено.");
      return res.status(403).json("Ви зможете оновити тільки свої данні!");
    }
    // );
    // }
  );
};
