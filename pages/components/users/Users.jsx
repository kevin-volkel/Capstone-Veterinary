import React from "react";
import UserCard from "./UserCard";

const Users = ({users, user}) => {
  return <>
    <h4>{user.name}</h4>
    {users.map((student) => (
      <UserCard user={student} />
    ))}
  </>
}

export default Users;