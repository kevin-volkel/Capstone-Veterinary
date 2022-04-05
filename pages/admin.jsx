import React, { useState } from "react";
import { destroyCookie, parseCookies } from 'nookies';
import { redirectUser, baseURL } from './util/auth';
import axios from 'axios';
// import Footer from "./components/layout/Footer";
import { Header } from "semantic-ui-react";
import Animals from "./components/animals/Animals";
import Events from "./components/events/Events";

const admin = ({ user }) => {
  const [showEvents, setShowEvents] = useState(true)

  return <div id="admin">
    <div className="header">
      <Header as='h1' onClick={() => setShowEvents(true)}>Events</Header>
      <Header as="h1" onClick={() => setShowEvents(false)}>Animals</Header>
    </div>
    {showEvents && <Events user={user} />}
    {!showEvents && <Animals user={user} />}
    {/* <Footer /> */}
  </div>;
};

export default admin;
