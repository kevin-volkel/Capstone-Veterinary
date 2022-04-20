import React from 'react';
import { Image } from 'semantic-ui-react'

const EventCard = ({ event }) => {
  return <>
      <div className="img-container">
        <Image
          className="embla_slide_img"
          src={event.bannerPic}
          alt="Something cool"
        />
        <div className="gradient" />
      </div>
  </>
};

export default EventCard;
