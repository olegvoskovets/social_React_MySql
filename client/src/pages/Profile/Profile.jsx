import "./profile.scss";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GamesUser from "../GamesUser/GamesUser";
import { useLocation } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfile } from "../../store/Users";
import { getCommonFriends, orFriends } from "../../store/Friends.js";

import { useDispatch, useSelector } from "react-redux";
import Update from "../../components/Update/Update";
import PostProfile from "../../components/PostProfile/Postprofile";

const Profile = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const dispatch = useDispatch();
  // const [userProfile, setUserProfile] = useState([]);
  const { friend } = useSelector((state) => state.friendsReducer.friendsSlice);
  const { commonFriends } = useSelector(
    (state) => state.friendsReducer.friendsSlice
  );
  const { userProfile, loading } = useSelector(
    (state) => state.usersReducer.usersSlice
  );
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newCurrentUser, setNewCurrentUser] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(orFriends({ id: currentUser.id, id_friend: userId }));
  }, [userId, newCurrentUser]); // тут надо изменить чтоби диспачить профайл подругому
  // newCurrentUser && dispatch(getUserProfile(userId));

  return (
    <div className="profile">
      {loading ? (
        "Loading"
      ) : (
        <>
          {userProfile && (
            <>
              <div className="images">
                <img
                  src={
                    userProfile.coverPic
                      ? "/upload/" + userProfile.coverPic
                      : "/images/nofoto-34.jpg"
                  }
                  alt=""
                  className="cover"
                />
                <img
                  src={
                    userProfile.profilePic
                      ? "/upload/" + userProfile.profilePic
                      : "/images/no_avatar_57.jpg"
                  }
                  alt=""
                  className="profilePic"
                />
              </div>

              <div className="profileContainer">
                <div className="uInfo">
                  <div className="left">
                    <a href="http://facebook.com">
                      <FacebookTwoToneIcon fontSize="large" />
                    </a>
                    <a href="http://facebook.com">
                      <InstagramIcon fontSize="large" />
                    </a>
                    <a href="http://facebook.com">
                      <TwitterIcon fontSize="large" />
                    </a>
                    <a href="http://facebook.com">
                      <LinkedInIcon fontSize="large" />
                    </a>
                    <a href="http://facebook.com">
                      <PinterestIcon fontSize="large" />
                    </a>
                  </div>
                  <div className="center">
                    <span>{userProfile.name}</span>
                    <div className="info">
                      <div className="item">
                        <PlaceIcon />
                        <span>{userProfile.city}</span>
                      </div>
                      <div className="item">
                        <LanguageIcon />
                        <span>{userProfile.website}</span>
                      </div>
                    </div>
                    {userProfile?.id === currentUser?.id ? (
                      <button
                        className="save_foto"
                        onClick={() => setOpenUpdate(true)}
                      >
                        Змінити данні
                      </button>
                    ) : (
                      <button>follow</button>
                    )}

                    <button>{friend ? "Ви друзі" : "Запросити дружити"}</button>
                  </div>
                  <div className="right">
                    <EmailOutlinedIcon />
                    <span> {userProfile.email}</span>

                    <MoreVertIcon />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {openUpdate && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={userProfile}
          setNewCurrentUser={setNewCurrentUser}
        />
      )}
      {userProfile && <PostProfile userProfile={userProfile} />}
      <GamesUser userId={userId} />
    </div>
  );
};

export default Profile;
