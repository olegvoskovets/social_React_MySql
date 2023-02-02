import "./friendsListRequests.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ItemFriendRequest from "./ItemFriendRequest/ItemFriendRequest";

const FriendsListRequests = ({ requests_friends }) => {
  return (
    <div className="friendsListRequests">
      <div className="friendsListRequests_header">
        <div className="friendsListRequests-text">
          <h4>
            {requests_friends?.length > 0
              ? `Всього запитів: ` + requests_friends.length
              : "Запити поки відсутні"}
          </h4>
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="знайдіть майбутніх друзів ..." />
        </div>
      </div>

      <div className="friendsListRequests_context">
        {requests_friends?.map((item) => (
          <div className="item_friends" key={item.id}>
            <ItemFriendRequest friend_request={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsListRequests;
