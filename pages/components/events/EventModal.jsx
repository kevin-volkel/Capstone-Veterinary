import React from "react";
import { Divider, Icon, Image } from "semantic-ui-react";
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
      <div className="event-modal-content">
        <Image
          className="event-modal-img"
          alt={`${event.title} Image`}
          src={event.bannerPic}
        />
        <div className="event-modal-text">
          <h5 className="event-modal-date event-meta">{convertDate(event.date)}</h5>
          <h5 className="event-modal-location event-meta">{event.location}</h5>
          <Divider />
          <p className="event-modal-desc">{event.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
