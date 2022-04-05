import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import Image from "next/image";
import vetLogo from "../../../public/media/vetlogo.png";

const Navbar = ({ user }) => {
  return (
    <Menu>
      <Image className="vetlogo" src={vetLogo} alt="Vet Logo" />
    </Menu>

    // {user !== null && (
    //   <>
    //     <Menu.Item name="admin">
    //       <Link href="/admin">Admin</Link>
    //     </Menu.Item>
    //     <Menu.Item name="admin">Logout</Menu.Item>
    //   </>
    // )}
  );
};

export default Navbar;
