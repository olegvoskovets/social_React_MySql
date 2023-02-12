import { json } from "express";
import { db } from "../connect.js";

export const getAllFriendUserId = (req, res) => {
  const q = `SELECT u.name,u.profilePic,u.id 
  FROM friends AS f 
  INNER JOIN users AS u 
   ON u.id=f.userId_friend 
  WHERE f.userId=?
  AND f.reply=true  
  `;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
// кто робив запит на друга?
export const getAllFriendUserIdRequests = (req, res) => {
  const q = `SELECT u.name,u.profilePic,u.id ,f.id AS requestId
  FROM friends AS f
  INNER JOIN users AS u
   ON u.id=f.userId
  WHERE f.userId_friend=?
  AND f.reply=false    `;

  let values = [req.params.userId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
//UPDATE posts SET `userId`=?,`post_on_the_user_page`=?,`title`=?,`image`=?,`last_update`=? WHERE `id`=?
//положительна відповідь на запити стати друзями
//ви повинні перевірити можливо ви теж давали на запит стати друзями
//і треба зробити запісь в базу від ще вашого імені

export const confirmRequestsFriend = (req, res) => {
  let q = `UPDATE  friends SET watched=true, reply=true WHERE id=? `;
  let values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    //ми підтвердили запит на дружбу, тепер треба зробити запис що і ви його друг
    // перед цим перевірити може ваш запити на друга теж існує
    q = `SELECT * FROM friends WHERE userId=${req.body.userId} and userId_friend=${req.body.userId_friend}`;

    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length > 0) {
        q = `UPDATE  friends SET watched=true, reply=true  WHERE userId=${req.body.userId} and userId_friend=${req.body.userId_friend} `;
        db.query(q, [], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Ви стали друзями");
        });
      } else {
        values = [req.body.userId, req.body.userId_friend, true, true];
        if (data) {
          q =
            "INSERT INTO friends (`userId`,`userId_friend`,`watched`,`reply`)  VALUE (?) "; //,
          db.query(q, [values], (err, data) => {
            if (err) {
              return res.status(500).json(err);
            } else {
              return res.status(200).json("Ви друзі");
            }
          });
        }
      }
    });
  });
};
//INSERT INTO posts (`userId`,`post_on_the_user_page`,`title`,`image`,`creation_post`) VALUE (?)
//
export const inviteToBeFriends = (req, res) => {
  let q = "INSERT INTO friends (`userId`,`userId_friend`) VALUE (?)";
  const values = [req.body.userId, req.body.userId_friend];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Ви запросили дружити");
  });
};

export const getRequestsFriend = (req, res) => {
  //може бути три відповіді
  //1. немає данних . відповідь "Запросити дружити"
  //2/ ви запросили дружити а він ще не відповів. відповіь "Чекєте відповіді"
  //3. вас запросили дружити а ви не відповіли . відповідь "Підтвердити"
  let q = `SELECT reply FROM friends WHERE userId=? AND userId_friend=?  `; //можливо ми подавали запит на дружбу
  const values = [req.body.id, req.body.id_friend];
  db.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0] === undefined) {
      //можливо нам подавали запити на друзів
      q = `SELECT id, reply FROM friends WHERE userId_friend=? AND userId=? `;

      db.query(q, [...values], (err, data) => {
        // console.log("data2 = ", data[0], " values ", values);
        if (err) return res.status(500).json(err);
        if (data[0] === undefined) {
          //то нам також не подавали запит на дружбу
          return res.json({ message: "Запросити дружити" });
        } else {
          //нам подавали запит на дружбу
          console.log("idrequst", data[0]);
          return res.json({ id: data[0].id, message: "Підтвердити дружбу" });
        }
      });
    } else {
      return res
        .status(200)
        .json({ id: data[0].id, message: "Чекaєте відповіді" });
    }
  });
};
export const deleteRequestFriend = (req, res) => {
  const q = `DELETE  FROM friends  WHERE  id=? `;
  const values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Ви видалили запит стати друзями");
  });
};
//пошук спільних друзів
export const commonFriends = (req, res) => {
  if (req.body.id !== req.body.id_friend) {
    const q = `SELECT u.name ,u.profilePic
  FROM friends AS f 
  INNER JOIN users AS u
   ON u.id=f.userId_friend 
  WHERE f.userId=?
  AND f.reply=true   
  `;
    // console.log("id=", req.body, " id_friend=", req.body.id_friend);
    let arr1;
    let arr2;
    db.query(q, [req.body.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        arr1 = data;

        db.query(q, [req.body.id_friend], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length > 0) {
            arr2 = data;
            let newArr = [];
            let i;
            for (i = 0; i < arr1.length; ++i) {
              let user = arr2.find((item) => item.name == arr1[i].name);
              if (user !== undefined) {
                newArr.push(user);
              }
            }
            if (newArr.length > 0) {
              return res.status(200).json(newArr);
            } else {
              return res.status(200).json("Cпільні друзі відсутні");
            }
          } else {
            return res.status(200).json("Немає спільних друзів");
          }
        });
      } else {
        return res.status(200).json("У Вас немає друзів");
      }

      //return res.status(200).json(data);
    });
  } else {
    return res.status(200).json("Ви не можете зрівнювати друзів сам у себе");
  }
};
export const orFriends = (req, res) => {
  const q = `SELECT * FROM friends WHERE userId=? AND userId_friend=? AND reply=true`;
  const values = [req.body.id, req.body.id_friend];
  db.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
    return res.status(200).json(false);
  });
};
export const deleteFriend = (req, res) => {
  let q = `DELETE  FROM friends  WHERE  userId=? AND userId_friend=? `;
  let values = [req.body.userId, req.body.userId_friend];
  db.query(q, [...values], (err, data) => {
    if (err) return res.status(500).json(err);
    //видаляємо також і данні друга по моєму userId_friend
    values = [req.body.userId_friend, req.body.userId];
    db.query(q, [...values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Видалили друга ...");
    });
  });
};
