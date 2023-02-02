import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import "./gamesUser.scss";

const GamesUser = ({ userId }) => {
  const [userGames, setUserGames] = useState([]);
  const [loding, setLoading] = useState(true);

  const getUserGames = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8800/api/games/" + userId);
      setUserGames(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserGames();
  }, [userId]);

  return (
    <div className="gamesUser">
      {loding ? (
        "Loading ... "
      ) : (
        <div className="container2">
          {userGames.map((game, i) => (
            <div className="game" key={game.id}>
              <div className="nomer">{i + 1}</div>
              <div className="date">
                <p>Гра відбулась:</p>
                <span>{moment(game.createdAt).format("D MMM YYYY")}</span>
              </div>
              <div className="count">Очки: {game.count}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesUser;
