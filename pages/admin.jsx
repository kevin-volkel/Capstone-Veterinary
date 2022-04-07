import React, { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser, baseURL } from "./util/auth";
import axios from "axios";
// import Footer from "./components/layout/Footer";
import { Header } from "semantic-ui-react";
import Animals from "./components/animals/Animals";
import Events from "./components/events/Events";

const admin = ({user}) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div id="admin">
      <div id="header">
        {showEvents ? (
          <Header as="h1" style={{color: "#F7931D"}} onClick={() => setShowEvents(true)}>
            Events
          </Header>
        ) : (
          <Header as="h1" onClick={() => setShowEvents(true)}>
            Events
          </Header>
        )}

        {!showEvents ? (
          <Header as="h1" style={{color: "#F7931D"}} onClick={() => setShowEvents(false)}>
            Animals
          </Header>
        ) : (
          <Header as="h1" onClick={() => setShowEvents(false)}>
            Animals
          </Header>
        )}

      </div>
      {showEvents && <Events user={user} />}
      {!showEvents && <Animals />}
      {/* <Footer /> */}
    </div>
  );
};

export default admin;
