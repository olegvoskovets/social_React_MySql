import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsUserId } from "../../../../store/Friends.js";
import "./itemFriendRequest.scss";

//підтверджуємо запит стати друзями

const ItemFriendRequest = ({ friend_request }) => {
  const [visible_Btn_Confirm, setVisible_Btn_Confirm] = useState(true);
  const [visible_Btn_Delete, setVisible_Btn_Delete] = useState(true);
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const dispatch = useDispatch();

  const handleClickConfirm = async (id) => {
    try {
      await axios.put("http://localhost:8800/api/friends/requests/" + id);
      setVisible_Btn_Confirm(false);
      dispatch(getAllFriendsUserId(currentUser.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickDeleteRequest = async (id) => {
    try {
      await axios.delete("http://localhost:8800/api/friends/requests/" + id);
      setVisible_Btn_Delete(false);
      setVisible_Btn_Confirm(false);
      dispatch(getAllFriendsUserId(currentUser.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="item_friend_request">
      <div className="item_friend_request_img">
        {friend_request.profilePic ? (
          <img
            className="img"
            src={"/upload/" + friend_request.profilePic}
            alt=""
          />
        ) : (
          <img className="img" src={"/images/no_avatar_57.jpg"} alt="" />
        )}
      </div>
      <div className="item_friend_request_info">{friend_request.name}</div>
      <div className="friends_btn">
        <div
          className={visible_Btn_Confirm ? "confirm" : "confirm no_visible"}
          onClick={() =>
            visible_Btn_Confirm && handleClickConfirm(friend_request.requestId)
          }
        >
          {visible_Btn_Confirm && "Підтвердити"}
        </div>

        <div
          className={
            visible_Btn_Delete ? "delete_requst" : "delete_requst no_visible"
          }
          onClick={() => handleClickDeleteRequest(friend_request.requestId)}
        >
          {visible_Btn_Delete ? " Видалити" : "Запит видалено"}
        </div>
      </div>
    </div>
  );
};

export default ItemFriendRequest;
