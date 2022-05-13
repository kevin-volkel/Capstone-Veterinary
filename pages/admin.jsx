import React, { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser, baseURL } from "./util/auth";
import axios from "axios";
// import Footer from "./components/layout/Footer";
import { Header, Segment } from "semantic-ui-react";
import Animals from "./components/animals/Animals";
import Events from "./components/events/Events";
import Users from "./components/users/Users";
import { sortDates } from "./util/dateFuncs";
import Cookies from "js-cookie";

const admin = ({ user, animals, events, users }) => {
  const [activePage, setActivePage] = useState("animals");

  return (
    <div id="admin">
      <div id="header">
        <Header
          as="h1"
          role="link"
          tabIndex={1}
          className={activePage === "animals" ? "active" : ""}
          onClick={() => setActivePage("animals")}
        >
          Animals
        </Header>
        {user.role === "teacher" && (
          <Header
            as="h1"
            role="link"
            tabIndex={2}
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            Users
          </Header>
        )}

        <Header
          as="h1"
          role="link"
          tabIndex={3}
          className={activePage === "events" ? "active" : ""}
          onClick={() => setActivePage("events")}
        >
          Events
        </Header>
      </div>
      {activePage === "animals" ? (
        <Segment id="admin-animals">
          <Animals isAdmin={true} user={user} animals={animals} />
        </Segment>
      ) : activePage === "events" ? (
        <Segment id="admin-events">
          <Events user={user} events={events} />
        </Segment>
      ) : activePage === "users" ? (
        <Segment id="admin-users">
          <Users user={user} users={users} />
        </Segment>
      ) : (
        <></>
      )}
    </div>
  );
};

admin.getInitialProps = async ({ ctx }) => {
  let pageProps = {};
  try {
    const animalRes = await axios.get(`${baseURL}/api/v1/animal`);
    pageProps.animals = animalRes.data;
    const eventsRes = await axios.get(`${baseURL}/api/v1/event`);
    pageProps.events = eventsRes.data;
    const usersRes = await axios.get(`${baseURL}/api/v1/user`);
    console.log(usersRes.data);
    pageProps.users = usersRes.data;
  } catch (err) {
    console.error(err);
    pageProps.errorLoading = err;
  }
  return pageProps;
};

export default admin;
