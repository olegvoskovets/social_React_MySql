import "./friendsList.scss";
import ItemFriend from "./ItemFriend/ItemFriend";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const FriendsList = ({ friends }) => {
  return (
    <div className="friends_list">
      <div className="friends_list_header">
        <div className="friends_list-text">
          <h2> {friends?.length > 0 ? "Усі друзі" : "Друзі поки відсутні"}</h2>
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="знайдіть друзів ..." />
        </div>
      </div>

      <div className="friends_list_context">
        {friends?.map((item) => (
          <div className="item_friends" key={item.id}>
            <ItemFriend friend={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
