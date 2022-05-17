import React from 'react';
import { Image } from 'semantic-ui-react';
import bannerPic from "../../../public/media/home-page-banner.jpg";
const NoEvents = () => {

  const event = {
    bannerPic,
    title: "Welcome to West Mec Veterinary!",
    desc: "Here, you can view the cat-alogue of animals we have up for adoption."
  }

  return (
    <>
      <Image
        className="embla_slide_img"
        src={event.bannerPic.src}
        alt={event.title}
      />
      <div className="gradient" />
      <div className="text">
        <div className="card-title">{event.title.toUpperCase()}</div>
        <div className="card-desc">
          {event.desc}
        </div>
      </div>
    </>
  );
};

export default NoEvents;
