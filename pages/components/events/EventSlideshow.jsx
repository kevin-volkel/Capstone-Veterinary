import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Loader, Image, Placeholder, Button } from 'semantic-ui-react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, NextButton, PrevButton } from './SlideshowButtons';
import EventCard from './EventCard';
import NoEvents from './NoEvents';

const EventSlideshow = () => {
  // const autoplay = useRef(
  //   Autoplay(
  //     {
  //       delay: 3000,
  //       stopOnInteraction: false,
  //       stopOnLastSnap: false,
  //       stopOnMouseEnter: true,
  //     },
  //     (emblaRoot) => emblaRoot.parentElement
  //   )
  // );
<<<<<<< HEAD
  //needed to comment it out for now, was breaking website
=======
>>>>>>> 209091ba4fd33b48e30a17535ba566832943d8d0
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap);
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList);
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  useEffect(async () => {
    setLoading(true);
    await fetchEvents();
    setLoading(false);
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get(`/api/v1/event`);
    setEvents(res.data);
  };

  return (
    <>
      <div className='event-slideshow'>
        {loading ? (
          <Loader />
        ) : (
          <div className="slideshow">
            <div className="embla">
              <div className="embla_viewport" ref={viewportRef}>
                <div className="embla_container">
                  {events.length === 0 ? 
                  <>
                    <NoEvents />
                  </> : events.map((event, index) => (
                    <div className="embla_slide" key={index}>
                      <div className="embla_slide_inner">
                        <EventCard event={event} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {events.length > 1 && (
                <>
                  <PrevButton onClick={scrollPrev} />
                  <NextButton onClick={scrollNext} />
                </>
              )}
            </div>
            <div className='embla_dots'>
              {events.map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventSlideshow;
