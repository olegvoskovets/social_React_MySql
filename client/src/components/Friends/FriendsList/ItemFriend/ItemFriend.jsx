import { useState } from "react";
import InformUserPost from "../../../InformUserPost/InformUserPost";
import "./itemFriend.scss";

const ItemFriend = ({ friend }) => {
  const [visiblePage, setVisiblePage] = useState(false);

  const nadleMouseEnterPage_profilePic = () => {
    setVisiblePage(true);
  };

  const nandleMouseLeavePage_profilePic = () => {
    setVisiblePage(false);
  };
  return (
    <div className="item_friend">
      <div className="item_friend_img">
        {friend.profilePic ? (
          <img className="img" src={"/upload/" + friend.profilePic} alt="" />
        ) : (
          <img className="img" src={"/images/no_avatar_57.jpg"} alt="" />
        )}
      </div>
      <div
        onMouseEnter={nadleMouseEnterPage_profilePic}
        onMouseLeave={nandleMouseLeavePage_profilePic}
        className="item_friend_info"
      >
        {friend.name}
      </div>
      {visiblePage && <InformUserPost id={friend.id} Myclass={"absolute"} />}
    </div>
  );
};

export default ItemFriend;
