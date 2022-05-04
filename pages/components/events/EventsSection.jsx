import React from "react";

const EventsSection = () => {
  return (
    <div className="events-map">
      <h1>Events</h1>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.2604052315046!2d-112.1209803847974!3d33.57258748073918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b1218ffffffff%3A0xc7a77ab42dc8679a!2sCastles%20N&#39;%20Coasters!5e0!3m2!1sen!2sus!4v1651538057740!5m2!1sen!2sus"
          width="90%"
          height="100%"
          style={{ border: 0 }}
          //allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          aria-label="dot-button"
        ></iframe>
      </div>
    </div>
  );
};

export default EventsSection;
