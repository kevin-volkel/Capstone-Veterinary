import React from 'react';

const EventModal = ({ event }) => {
  return <div className="event-modal-wrap">
    <h1>{event.title}</h1>
  </div>;
};

export default EventModal;
