import { useDispatch, useSelector } from "react-redux";
import "./informUserPost.scss";
import { getUser } from "../../store/Users.js";
import { getCommonFriends, orFriends } from "../../store/Friends.js";

import { useEffect, useState } from "react";
import axios from "axios";

const InformUserPost = ({ id, Myclass }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer.usersSlice);
  const { friend } = useSelector((state) => state.friendsReducer.friendsSlice);
  const { commonFriends } = useSelector(
    (state) => state.friendsReducer.friendsSlice
  );
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  // const [yesFriend, setYesFriend] = useState(false);
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getCommonFriends({ id: currentUser.id, id_friend: id }));
    dispatch(orFriends({ id: currentUser.id, id_friend: id }));
    // yesFriend(friend);
    // getcommonFriendsFetch({ id: currentUser.id, id_friend: id });
    // addcommonFriends({ id: currentUser.id, id_friend: id });
  }, []);
  // console.log("friend? ", yesFriend);
  return (
    <div className={"informUserPost " + Myclass}>
      <div className="informUserPost_header">
        <div className="informUserPost_header_left">
          {user && user[0].profilePic ? (
            <img src={"/upload/" + user[0].profilePic} alt="" />
          ) : (
            <img src="/images/no_avatar_57.jpg" alt="" />
          )}
        </div>

        <div className="informUserPost_header_right">
          <div className="informUserPost_header_right_name">
            {user && user[0].name}
          </div>
          <div className="informUserPost_header_right_common_friends">
            {commonFriends?.length > 0 ? (
              <div className="size">{commonFriends.length} спільних друзів</div>
            ) : (
              <div className="size">
                {currentUser.id !== id && "Немає спільних друзів"}
              </div>
            )}
          </div>
          <div className="informUserPost_header_right_city">
            {user && user[0].city}
          </div>
        </div>
      </div>
      {/* currentUser.id !== id && 
      це означає що користувач отримує інформацію з свого профіля
      */}
      {currentUser.id !== id && (
        <div className="informUserPost_btn">
          <div className="informUserPost_btn_message">Повідомлення</div>
          <div className="informUserPost_btn_addField">
            {friend ? "Ви друзі" : "Запросити дружити"}
          </div>
          <div className="informUserPost_btn_toBlock">...</div>
        </div>
      )}
    </div>
  );
};

export default InformUserPost;
