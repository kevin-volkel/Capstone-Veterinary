import React, {useState} from 'react';
import { Image, Dropdown, Form, Icon } from 'semantic-ui-react';
import { deleteUser, editUser } from '../../util/userActions';

const UserCard = ({ user, currentUser }) => {
  const [emailEditing, setEmailEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const handleEdit = () => {};

  return (
    <div className={'user-card'}>
      <div className="profile-pic">
        <Image src={user.profilePicURL} avatar />
      </div>
      <div className="text">
        <div className="user-card-top">
          <p className="user-name">{user.name}</p>
          {currentUser.class.campus === user.class.campus && (
            <div className="options">
              <Dropdown
                icon="ellipsis vertical"
                title="Dropdown"
                direction="left"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Change Email"
                    onClick={() => setEmailEditing((prev) => !prev)}
                  />
                  <Dropdown.Item
                    text="Delete User"
                    onClick={() => deleteUser(user._id)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
        {/* <h1>{user._id}</h1> */}
        <div className="user-card-mid">{user.class.campus}</div>
        <div className="user-card-bottom">
          {emailEditing ? (
            <div className="edit-email">
              <input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Icon name="edit outline"/>
            </div>
          ) : (
            user.email
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
