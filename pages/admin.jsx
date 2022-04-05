import React, { useState } from "react";
import { destroyCookie, parseCookies } from 'nookies';
import { redirectUser, baseURL } from './util/auth';
import axios from 'axios';
import Footer from "./components/layout/Footer";
import { Header } from "semantic-ui-react";
import Animals from "./components/animals/Animals";
import Events from "./components/events/Events";

const admin = ({ user }) => {
  const [showEvents, setShowEvents] = useState(true)

  return <div id="admin" style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
    <div className="header" style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      <Header as='h1' onClick={() => setShowEvents(true)} style={{cursor: "pointer", margin: 0}} >Events</Header>
      <Header as="h1" onClick={() => setShowEvents(false)} style={{cursor: "pointer", margin: 0}} >Animals</Header>
    </div>
    {showEvents && <Events user={user} />}
    {!showEvents && <Animals user={user} />}
    {/* <Footer /> */}
  </div>;
};

export default admin;
