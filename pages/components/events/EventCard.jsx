import React from 'react';
import { Image } from 'semantic-ui-react';
import { convertDate } from '../../util/dateFuncs';

const EventCard = ({ event, gradient = true }) => {
  return (
    <>
      <Image
        className='embla_slide_img'
        src={event.bannerPic}
        alt='Something cool'
      />
      {gradient && <div className='gradient' />}
      <div className='text'>
        <div className='card-date'>{convertDate(event.date)}</div>
        <div className='card-title'>{event.title}</div>
        <div className='card-desc'>
          {event.desc.length > 50
            ? `${event.desc.slice(0, 48)}...`
            : event.desc}
        </div>
      </div>
    </>
  );
};

export default EventCard;
