import React, { useState } from "react";
import { Image, Dropdown, Form, Icon } from "semantic-ui-react";
import { deleteUser, editUser } from "../../util/userActions";
import Users from "./Users";

const UserCard = ({ user, currentUser, setLoading }) => {
  const [editing, setEditing] = useState(false);
  const [newUser, setNewUser] = useState({
    email: user.email,
  });

  const handleChange = (e, data) => {
    const { name, value } = e.target;

    if (!name) {
      setNewUser((prev) => ({
        ...prev,
        [data.name]: data.value,
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editUser(newUser.email, user._id, setNewUser);

    setEditing(false);
  };

  return (
    <div className={"user-card"}>
      <div className="profile-pic">
        <Image src={user.profilePicURL} avatar />
      </div>
      <div className="text">
        <div className="user-card-top">
          <p className="user-name">{user.name}</p>
          <p className="user-role">{user.role}</p>
          {currentUser.class.campus === user.class.campus && (
            <div className="options">
              <Dropdown
                icon="ellipsis vertical"
                title="Dropdown"
                direction="left"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Edit User"
                    onClick={() => setEditing(true)}
                  />
                  <Dropdown.Item
                    text="Delete User"
                    onClick={() => deleteUser(user._id, setLoading, currentUser._id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        {/* <h1>{user._id}</h1> */}
        <div className="user-card-mid">{user.class.campus}</div>
        <div className="user-card-bottom">
          {editing ? (
            <div className="edit-email">
              <input
                value={newUser.email}
                name="email"
                onChange={handleChange}
              />
              <Icon
                name="checkmark"
                color="green"
                style={{ cursor: "pointer" }}
                onClick={handleSubmit}
              />
              <Icon
                name="x"
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setNewUser({ email: user.email });
                  setEditing(false);
                }}
              />
            </div>
          ) : (
            newUser.email
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
