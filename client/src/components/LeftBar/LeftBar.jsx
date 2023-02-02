import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAllFriendsUserId } from "../../store/Friends.js";
import { useEffect } from "react";

const LeftBar = () => {
  const { friends } = useSelector((state) => state.friendsReducer.friendsSlice);
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    currentUser && dispatch(getAllFriendsUserId(currentUser.id));
  }, [currentUser]);

  return (
    <div className="leftBar">
      <div className="container2">
        <div className="menu">
          <div className="user">
            {currentUser ? (
              <>
                {!currentUser.profilePic ? (
                  <img src="/images/no_avatar_57.jpg" alt="" />
                ) : (
                  <img src={"/upload/" + currentUser.profilePic} alt="" />
                  // {"/upload/" + winner.profilePic}
                )}
                <Link
                  to={`/profile/${currentUser.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <span>{currentUser?.name}</span>
                </Link>
              </>
            ) : (
              <>
                <img src="./images/no_avatar_57.jpg" alt="" />
                <span>Гість</span>
              </>
            )}
          </div>

          <div className="item">
            <Link
              to={"/friends"}
              style={{ textDecoration: "none" }}
              className={"item_Link"}
            >
              <img src={Friends} alt="" />
              <span>Друзі</span>
              {friends?.length > 0 ? (
                <span>{friends.length}</span>
              ) : (
                "немає друзів"
              )}
            </Link>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
