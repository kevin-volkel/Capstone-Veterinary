import React from "react";

const EventsSection = () => {
  return (
    <div className="events-map">
      <h1>Featured Event</h1>
      <div className="map-and-text">
        <p>
          WOAAAAAH an event!! you guys knew we have an event? Because we do!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
          tempora? Perspiciatis fuga accusamus delectus commodi nulla sequi
          labore! Est deserunt nulla nihil ab, distinctio quo facere tempora
          quae hic recusandae! WOAAAAAH an event!! you guys knew we have an
          event? Because we do!
        </p>
        <div className="allMaps">
          <div className="map1">
            <h3 style={{ marginTop: "1rem"}}>Event Name</h3>
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
    </div>
  );
};

export default EventsSection;
