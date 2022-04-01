import React from "react";
import { Menu } from "semantic-ui-react";
import Link from 'next/link'

const Navbar = ({ user }) => {
  return (
    <Menu>
      <Menu.Item name="home"><Link href="/">Home</Link></Menu.Item>

      <Menu.Item name="adoption"><Link href="/adoption">Adoption</Link></Menu.Item>

    { user !== null && (<>
      <Menu.Item name="admin"><Link href="/admin">Admin</Link></Menu.Item>
      <Menu.Item name="admin">Logout</Menu.Item>
    </>
    )}
    </Menu>
  );
};

export default Navbar;
