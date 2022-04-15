import React, { useState, useEffect } from 'react';
import bannerPic from '../../../public/media/home-page-banner.jpg';
import axios from 'axios';
import { Loader, Image, Placeholder, Button } from 'semantic-ui-react';
import { baseURL } from '../../util/auth';

const EventSlideshow = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currEvent, setCurrEvent] = useState({})
  const [currEventIndex, setCurrEventIndex] = useState(0)

  useEffect(async () => {
    setLoading(true);
    await fetchEvents();
    setLoading(false);
  }, []);
  
  const fetchEvents = async () => {
    const res = await axios.get(`/api/v1/event`);
    setEvents(res.data);
    setCurrEvent(res.data[0])
  }

  const nextEvent = () => {
    setCurrEventIndex((currEventIndex === events.length - 1) ? 0 : currEventIndex + 1)
    setCurrEvent(events[currEventIndex])
    console.log(events)
  }

  return (
    <>
      <div className="event-slideshow">
        {loading ? (
          <Loader />
        ) : currEvent === undefined ? <Placeholder.Image/> : (
          <div className='img-container' onLoad={() => setInterval(nextEvent, 5000)}>
            <Image src={currEvent.bannerPic}/>
          </div>
        )}
      </div>
    </>
  );
};

export default EventSlideshow;
