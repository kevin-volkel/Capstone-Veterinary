import React, { useState, useEffect } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import AdminEvent from './AdminEvent';
import EventCard from './EventCard';

const Events = ({ user, events }) => {
  return (
    <>
      <Container fluid className="events-list">
        {events.map((event, i) => (
          <>
            <div className="event-card" key={i}>
              <AdminEvent event={event} />
            </div>
            {i !== events.length - 1 && <Divider />}
          </>
        ))}
      </Container>
    </>
  );
};

export default Events;
