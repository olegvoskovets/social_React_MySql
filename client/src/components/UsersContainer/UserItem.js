import React from "react";

const UserItem = ({ user }) => {
  return (
    <div className="user">
      {user.id}. {user.name}
    </div>
  );
};

export default UserItem;
