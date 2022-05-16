import React from "react";
import { Divider } from "semantic-ui-react";
import { convertDate } from "../../util/dateFuncs";

const EventsSection = ({ event }) => {
  return (
    <div className="map-and-text">
      <div className="event-text">
        <h3>{event.title}</h3>
        <p>{event.type}</p>
        <p>{convertDate(event.date)}</p>
        <Divider hidden/>
        <p>{event.desc}</p>
      </div>
      <div className="allMaps">
        <div className="map1">
          <h3 style={{ marginTop: "1rem" }}>{event.location}</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212531.3915933757!2d-112.35969561653579!3d33.662266193550465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b44a4c816e5af%3A0x61da180d51e2250b!2sWest-MEC%20Northwest%20Campus!5e0!3m2!1sen!2sus!4v1652490556047!5m2!1sen!2sus"
            width="90%"
            height="100%"
            style={{ border: 0, marginBottom: "1rem" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
