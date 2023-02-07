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

export const getAllFriendUserIdRequests = (req, res) => {
  // const q = `SELECT u.name,u.profilePic,u.id,f.id AS requestId
  //   FROM friends AS f
  //   INNER JOIN users AS u
  //   INNER JOIN users AS u_f
  //   ON u.id=f.userId AND f.userId_friend=u_f.id
  //   WHERE f.userId_friend=?
  //   AND f.reply=false
  //   `;
  const q = `SELECT u.name,u.profilePic,u.id ,f.id AS requestId
  FROM friends AS f 
  INNER JOIN users AS u
   
   ON u.id=f.userId_friend 
  WHERE f.userId=?
  AND f.reply=false    
  `;
  const values = [req.params.userId];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
//UPDATE posts SET `userId`=?,`post_on_the_user_page`=?,`title`=?,`image`=?,`last_update`=? WHERE `id`=?
export const confirmRequestsFriend = (req, res) => {
  const q = `UPDATE  friends SET watched=true, reply=true WHERE id=? `;
  const values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Ви підтвердили запит стати друзями");
  });
};
export const getRequestsFriend = (req, res) => {
  //може бути три відповіді
  //1. немає данних . відповідь false
  //2/ ви запросили дружити а він ще не відповів. відповіь "Чекєте відповіді"
  //3. вас запросили дружити а ви не відповіли . відповідь "Підтвердити"
  let q = `SELECT reply FROM friends WHERE userId=? AND userId_friend=?  `; //можливо ми подавали запит на дружбу
  const values = [req.body.id, req.body.id_friend];
  db.query(q, [...values], (err, data) => {
    console.log("data1 = ", data[0], " values ", values);
    if (err) return res.status(500).json(err);
    // if (data[0] === undefined) return res.status(200).json(false);
    if (data[0].reply === 0) {
      // Значит ми запрошували дружити
      return res.status(200).json("Чекєте відповіді");
    } else {
      //можливо нас запрошували дружити
      q = `SELECT reply FROM friends WHERE userId_friend=? AND userId=? `;

      db.query(q, [...values], (err, data) => {
        console.log("data2 = ", data[0], " values ", values);
        if (err) return res.status(500).json(err);
        //if (data[0] === undefined) return res.status(200).json(false);
        if (data[0].reply === 0) {
          //значит нас запрошували дружити
          return res.status(200).json("Підтвердити");
        } else {
          return res.status(200).json(false);
        }
      });
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
