import React from 'react';
import { Image } from 'semantic-ui-react';
import { convertDate } from '../../util/dateFuncs';

const EventModal = ({ event }) => {
  return (
    <div className="event-modal-wrap">
      <Image
        className="event-modal-img"
        alt={`${event.title} Image`}
        src={event.bannerPic}
      />
      <h2 className="event-modal-title">{event.title}</h2>
      <h5 className="event-modal-date">{convertDate(event.date)}</h5>
      <h5 className="event-modal-location">{event.location}</h5>
      <p className='event-modal-desc'>{event.desc}</p>
    </div>
  );
};

export default EventModal;
