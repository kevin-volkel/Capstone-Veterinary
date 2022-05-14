import React, { useRef, useEffect } from 'react';
import { Divider, Icon, Image } from 'semantic-ui-react';
import { convertDate } from '../../util/dateFuncs';
import EventDropdown from './EventDropdown';

const AdminEvent = ({ event, setEvents }) => {
  return (
    <>
      <div className="event-content">
        <div className="event-pic">
          <Image src={event.bannerPic} alt={event.title} />
        </div>
        <div className="event-info">
          <div className="event-title">{event.title.toUpperCase()}</div>
          {event.featured === true && <div className="event-featured">FEATURED</div>}
          <div className="event-date">{convertDate(event.date)}</div>
          <div className="event-desc">{event.desc}</div>
        </div>
      </div>
      <div className="options">
        <EventDropdown setEvents={setEvents} event={event} />
      </div>
    </>
  );
};

export default AdminEvent;
