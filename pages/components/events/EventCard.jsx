import React from 'react';
import { Image } from 'semantic-ui-react';

const EventCard = ({ event }) => {
  return (
    <>
      <Image
        className="embla_slide_img"
        src={event.bannerPic}
        alt="Something cool"
      />
      <div className="gradient" />
      <div className="text">
        <div className="card-title">{event.title}</div>
        <div className="card-desc">{event.desc.length > 50 ? `${event.desc.slice(0, 48)}...` : event.desc}</div>
      </div>
    </>
  );
};

export default EventCard;
