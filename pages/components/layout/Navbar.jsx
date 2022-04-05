import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { logoutUser } from "../../util/auth";

const Navbar = ({ user }) => {
  return (
    <Menu style={{margin: 0}}>
      <Menu.Item name="home">
        <Link href="/">Home</Link>
      </Menu.Item>

      <Menu.Item name="adoption">
        <Link href="/animals">Adoption</Link>
      </Menu.Item>

      {user !== null && (
        <>
          <Menu.Item name="admin">
            <Link href="/admin">Admin</Link>
          </Menu.Item>
          <Menu.Item name="admin" onClick={() => logoutUser(user.email)}>
            Logout
          </Menu.Item>
        </>
      )}

      {user == null && (
        <Menu.Item name="adoption">
          <Link href="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
