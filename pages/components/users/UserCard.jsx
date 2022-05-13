import React from 'react'

const UserCard = ({user}) => {
  return (
    <>
    <h2>{user.name}</h2>
    <div>{user.role}</div>
    <div>{user.email}</div>
    </>
  )
}

export default UserCard