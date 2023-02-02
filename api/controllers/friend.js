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
export const deleteRequestFriend = (req, res) => {
  const q = `DELETE  FROM friends  WHERE  id=? `;
  const values = [req.params.id];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Ви видалили запит стати друзями");
  });
};
// export const addcommonFriends = (req, res) => {
//   console.log("body ", req.body);
// };
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
