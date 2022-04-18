import React, { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser, baseURL } from "./util/auth";
import axios from "axios";
// import Footer from "./components/layout/Footer";
import { Header, Segment } from "semantic-ui-react";
import Animals from "./components/animals/Animals";
import Events from "./components/events/Events";

const admin = ({ user, animals }) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <div id="admin">
      <div id="header">
        {!showEvents ? (
          <Header
            as="h1"
            style={{ color: "#F7931D" }}
            onClick={() => setShowEvents(false)}
          >
            Animals
          </Header>
        ) : (
          <Header as="h1" onClick={() => setShowEvents(false)}>
            Animals
          </Header>
        )}

        {showEvents ? (
          <Header
            as="h1"
            style={{ color: "#F7931D" }}
            onClick={() => setShowEvents(true)}
          >
            Events
          </Header>
        ) : (
          <Header as="h1" onClick={() => setShowEvents(true)}>
            Events
          </Header>
        )}
      </div>
      {showEvents && <Events user={user} />}
      <Segment id="admin-animals">
        {!showEvents && <Animals isAdmin={true} user={user} animals={animals} />}
      </Segment>
    </div>
  );
};

admin.getInitialProps = async ({ ctx }) => {
  let pageProps = {};
  try {
    const animalRes = await axios.get(`${baseURL}/api/v1/animal`);
    pageProps.animals = animalRes.data;
    // const eventsRes = await axios.get(`${baseURL}/api/v1/events`)
    // pageProps.events = eventsRes.data;
  } catch (err) {
    console.error(err);
    pageProps.errorLoading = err;
  }
  return pageProps;
};

export default admin;
