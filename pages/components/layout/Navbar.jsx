import React from "react";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu>
      <Menu.Item name="editorials">Home</Menu.Item>

      <Menu.Item name="reviews">Adoption</Menu.Item>

      <Menu.Item name="upcomingEvents">Upcoming Events</Menu.Item>

      <Menu.Item name="upcomingEvents">Admin</Menu.Item>
    </Menu>
  );
};

export default Navbar;
