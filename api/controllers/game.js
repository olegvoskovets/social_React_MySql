import moment from "moment/moment.js";
import { db } from "../connect.js";

export const getGameCount = (req, res) => {
  const q1 = `SELECT  users.username,games.count ,users.profilePic, users.id, games.id AS games_Id,games.createdAt   FROM  
   games, users WHERE games.userId = users.id ORDER BY count DESC LIMIT 5`; //

  const q2 = `SELECT   users.username, users.profilePic,users.id,games.count,games.createdAt, games.id AS games_Id
     FROM users JOIN games ON users.id=games.userId  ORDER BY count DESC LIMIT 5 `;
  const q3 = `SELECT u.name ,u.profilePic,u.id, MAX(g.count)  AS count 
              FROM users AS u 
              INNER JOIN games AS g ON u.id=g.userId 
              GROUP BY u.name, u.profilePic,u.id
              ORDER BY count DESC LIMIT 5`;

  //,,g.createdAtg.createdAt,g.id,g.id
  db.query(q3, [], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.json("Немає ігор чи результатів");

    return res.status(200).json(data);
  });
};

// select distinct * from
//  (
//    select distinct(KEEP_ORGANIZATION) from GOV_ETALON where KEEP_ORGANIZATION is not null
//     union all
//    select distinct(STORED_ETALON) from REGISTER_ETALON where STORED_ETALON is not null
//  )

export const getUserGames = (req, res) => {
  const q = `SELECT games.*, users.username FROM games INNER JOIN users ON (games.userId=users.id) WHERE users.id=?  `;
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// SELECT posts.*, users.`name` as `user_name`
// FROM posts INNER JOIN users ON (posts.`autor_id`=users.`id`)
// WHERE posts.`id`=?

// select from_id from table where to_id = 5
// union
// select to_id from table where from_id = 5

export const downGameCount = (req, res) => {
  const q = "INSERT INTO games (`count`,`userId`,`createdAt`) VALUES(?)";

  const values = [
    req.body.count,
    req.body.userId,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Результати гри записані успішно .");
  });
};

// SELECT u.name, MAX(cc.number)
// FROM user u
// LEFT Join client_contacts cc
//   ON u.id = cc.user_id
// GROUP BY u.name

//   SELECT
//   id,
//   content,
//   (SELECT name FROM users WHERE id = posts.author_id)
// FROM
//   posts
// WHERE
//   id = 145

// SELECT *
// FROM tbPeoples, tbPosition
// WHERE tbPeoples.idPosition=tbPosition.idPosition
