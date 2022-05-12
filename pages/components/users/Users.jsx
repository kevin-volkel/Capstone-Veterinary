import React from 'react'

const Users = ({users}) => {
  return <>
    {users.map( (user) => (
      <h2>{user.name}</h2>
    ))}
  </>
}

export default Users