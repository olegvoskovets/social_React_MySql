import { Link } from "react-router-dom";
import "./rightBar.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
//import { fetchGameCount } from "../../store/gameCountWinnerSlice";
import { getUsersFetch, fetchGameCount } from "../../store/Users";
import { useDispatch, useSelector } from "react-redux";
import UsersContainer from "../UsersContainer/UsersContainer";
import CountGamesQuery from "../CountGamesQuery/CountGamesQuery";
//import { NoImage } from "/public/images/no_avatar_57.jpg";

const RightBar = () => {
  // const [users, setUsers] = useState([]);
  //const [gameCountWinner, setGameCountWinner] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);

  // const gameCountWinner = useSelector(
  //   (state) => state.gameCountWinnerReducer.gameCountWinnerSlice.gameCountWinner
  // );
  const { users, gameCountWinner, error } = useSelector(
    (state) => state.usersReducer.usersSlice
  );

  const getUsers = async () => {
    // try {
    //   setLoading(true);
    //   const res = await axios.get("http://localhost:8800/api/users");
    //   // setUsers(res.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const game_Winners = async () => {
    // try {
    //   const res = await axios.get("http://localhost:8800/api/games");
    //   // setGameCountWinner(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // useEffect(() => {
  //   getUsers();
  // }, [setUsers]);

  // useEffect(() => {
  //   game_Winners();
  // }, [setGameCountWinner]);

  useEffect(() => {
    dispatch(fetchGameCount());
  }, [fetchGameCount]);

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [getUsersFetch]);

  return (
    <div className="rightBar">
      <div className="container2">
        <div className="item">
          <span>Лідери змагань</span>
          {gameCountWinner?.map((winner) => (
            <div className="user" key={winner.id}>
              <div className="userInfo">
                {!winner.profilePic ? (
                  <img src="/images/no_avatar_57.jpg" alt="" />
                ) : (
                  <img src={"/upload/" + winner.profilePic} alt="" />
                )}

                <Link
                  to={currentUser && `/profile/${winner.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <span>{winner.name}</span>
                </Link>
              </div>
              <div className="namecount">
                <div className="count">{winner.count} балів</div>
                <span>гра відбулась:</span>
                <span className="date">
                  {moment(winner.createAt).fromNow()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Лідери змагань Query</span>
          <CountGamesQuery />
        </div>
        <div className="item">
          <span>Учасники наших змагань</span>

          <>
            <div>{error}</div>
            {users?.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  {!user.profilePic ? (
                    <img src="/images/no_avatar_57.jpg" alt="" />
                  ) : (
                    <img src={"/upload/" + user.profilePic} alt="" />
                  )}

                  <p>
                    <Link
                      to={currentUser && `/profile/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span>{user.name}</span>
                    </Link>
                  </p>
                </div>
                <div className="buttons">
                  <button>follow</button>
                  <button>dismiss</button>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="item">
          <span>Учасники наших змагань Query</span>

          <UsersContainer />
        </div>
        <div className="item">
          <span>OnLine Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="./images/no_avatar_57.jpg" alt="" />
              <div className="online" />
              <span>Djon Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
