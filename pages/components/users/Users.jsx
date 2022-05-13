import React from "react";
import UserCard from "./UserCard";

const Users = ({students, teachers, user}) => {
  return <>
    <h4>{user.name}</h4>
    {students.map((student) => (
      <UserCard user={student} />
    ))}
    {teachers.map((teacher) => (
      <UserCard user={teacher} />
    ))}
  </>
}

export default Users;