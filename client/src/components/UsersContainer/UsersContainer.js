import React from "react";
import { useFetchAllUsersQuery } from "../../store/services/UsersService";
import UserItem from "./UserItem";

const UsersContainer = () => {
  const { data = [] } = useFetchAllUsersQuery();

  return (
    <div>
      <div className="users__list">
        {data && data.map((user) => <UserItem user={user} key={user.id} />)}
      </div>
    </div>
  );
};

export default UsersContainer;
