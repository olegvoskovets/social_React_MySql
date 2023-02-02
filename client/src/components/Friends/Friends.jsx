import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import "./friends.scss";
import FriendsList from "./FriendsList/FriendsList";
import { getAllFriendsUserIdRequests } from "../../store/Friends.js";
import FriendsListRequests from "./FriendsListRequests/FriendsListRequests";

const Friends = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friendsReducer.friendsSlice);
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const { requests_friends } = useSelector(
    (state) => state.friendsReducer.friendsSlice
  );
  const [friendsCurrentUser, setFriendsCurrentUser] = useState(true);
  const [requestFriends, setRequestFriends] = useState(false);
  const [recommendationsFriends, setRecommendationsFriends] = useState(false);
  const [birthdays, setBirthdays] = useState(false);

  console.log("friends = ", friends);
  const handleClickFriends = () => {
    setFriendsCurrentUser(true);
    setRequestFriends(false);
    setRecommendationsFriends(false);
    setBirthdays(false);
  };
  const nandleClickRecommendations = () => {
    setRequestFriends(false);
    setFriendsCurrentUser(false);
    setBirthdays(false);
    setRecommendationsFriends(true);
  };
  const handleClickrequestFriends = () => {
    dispatch(getAllFriendsUserIdRequests(currentUser.id));
    setRecommendationsFriends(false);
    setFriendsCurrentUser(false);
    setBirthdays(false);
    setRequestFriends(true);
  };
  const handleClickBirthdays = () => {
    setRecommendationsFriends(false);
    setFriendsCurrentUser(false);
    setRequestFriends(false);
    setBirthdays(true);
  };
  console.log(
    "visible = friendsCurrentUser",
    friendsCurrentUser,
    "  requestFriends",
    requestFriends
  );
  return (
    <div className="friends">
      <div className="friends-left">
        <div className="item" onClick={handleClickrequestFriends}>
          <span> Запити на дружбу </span>
        </div>
        <div className="item" onClick={nandleClickRecommendations}>
          <span>Рекомендації </span>
        </div>
        <div className="item" onClick={handleClickFriends}>
          <span> Усі друзі </span>
        </div>
        <div className="item" onClick={handleClickBirthdays}>
          <span> Дні народження </span>
        </div>
      </div>
      <div className="friens-right">
        {friendsCurrentUser && <FriendsList friends={friends} />}
        {requestFriends && (
          <FriendsListRequests requests_friends={requests_friends} />
        )}
      </div>
    </div>
  );
};

export default Friends;
