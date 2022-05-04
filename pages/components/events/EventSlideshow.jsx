import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Loader, Image, Placeholder, Button } from 'semantic-ui-react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, NextButton, PrevButton } from './SlideshowButtons';
import EventCard from './EventCard';
import NoEvents from './NoEvents';
import Autoplay from 'embla-carousel-autoplay';
import { sortDates } from '../../util/dateFuncs';

const EventSlideshow = () => {
  const autoplay = useRef(
    Autoplay(
      {
        delay: 3000,
        stopOnInteraction: true,
        stopOnLastSnap: false,
        stopOnMouseEnter: true,
      },
      (emblaRoot) => emblaRoot.parentElement
    )
  );
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: true,
    },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    autoplay.current.reset;
  }, [embla]);
  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    autoplay.current.reset;
  }, [embla]);
  const scrollTo = useCallback(
    (index) => {
      if (!embla) return;
      embla.scrollTo(index);
      autoplay.current.reset;
    },

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
    const events = res.data.sort(sortDates);
    setEvents(events);
  };

  return (
    <>
      <div id='event-slideshow'>
        {loading ? (
          <Loader />
        ) : (
          <div className='slideshow'>
            <div className='embla'>
              <div className='embla_viewport' ref={viewportRef}>
                <div className='embla_container'>
                  {events.length === 0 ? (
                    <>
                      <NoEvents />
                    </>
                  ) : (
                    events.map((event, index) => (
                      <div className='embla_slide' key={index}>
                        <div className='embla_slide_inner'>
                          <EventCard event={event} gradient={true} />
                        </div>
                      </div>
                    ))
                  )}
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
              {events.length > 0 &&
                events.map((_, index) => (
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
