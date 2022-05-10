import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { convertDate } from "../../util/dateFuncs";

const EventModal = ({ event, setEventModalShowing }) => {
  return (
    <div className="event-modal-wrap">
      <div className="title-row">
        <h2 className="event-modal-title">{event.title}</h2>
        <Icon
          name="close"
          onClick={() => {
            setEventModalShowing(null);
          }}
          style={{
            cursor: 'pointer'
          }}
          size="large"
        />
      </div>
      <Image
        className="event-modal-img"
        alt={`${event.title} Image`}
        src={event.bannerPic}
      />
      <h5 className="event-modal-date">{convertDate(event.date)}</h5>
      <h5 className="event-modal-location">{event.location}</h5>
      <p className="event-modal-desc">{event.desc}</p>
    </div>
  );
};

export default EventModal;
