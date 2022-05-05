import React, { useRef, useEffect } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { convertDate } from '../../util/dateFuncs';
import EventDropdown from './EventDropdown';

const AdminEvent = ({ event, setEvents }) => {
  return (
    <>
      <div className='event-info'>
        <div className='event-title'>{event.title.toUpperCase()}</div>
        <div className='event-date'>{convertDate(event.date)}</div>
        <div className='event-desc'>
          {event.desc}
        </div>
      </div>
      <div className='event-pic'>
        <Image src={event.bannerPic} alt={event.title} />
      </div>
      <div className='options'>
        <EventDropdown setEvents={setEvents} eventId={event._id} />
      </div>
    </>
  );
};

export default AdminEvent;
