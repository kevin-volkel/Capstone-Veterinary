import React from 'react';
import { Image } from 'semantic-ui-react';
import bannerPic from "../../../public/media/home-page-banner.jpg";
const NoEvents = () => {
  return (
    <>
      <div className="embla_slide">
        <div className="embla_slide_inner">
          <Image
            src={bannerPic.src}
            alt="no events"
          />
        </div>
      </div>
    </>
  );
};

export default NoEvents;
