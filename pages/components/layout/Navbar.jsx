import React from "react";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu>
      <Menu.Item name="home">Home</Menu.Item>

      <Menu.Item name="adoption">Adoption</Menu.Item>

      <Menu.Item name="upcomingEvents">Upcoming Events</Menu.Item>

      <Menu.Item name="admin">Admin</Menu.Item>
    </Menu>
  );
};

export default Navbar;
