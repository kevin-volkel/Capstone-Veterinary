import Image from 'next/image';
import { Button, Segment, Modal } from 'semantic-ui-react';
import Footer from './components/layout/Footer';
import adopt from '../public/media/adoption.png';
import eventImg from '../public/media/event.png';
import fEvents from '../public/media/CAT.png';
import EventSlideshow from './components/events/EventSlideshow';
import EventsSection from './components/events/EventsSection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { sortDates } from './util/dateFuncs';
import EventModal from './components/events/EventModal';

//import "../styles/home.css";
// import bannerPic from "../public/media/home-page-banner.jpg";

export default function Home() {
  // const konamiCode = [
  //   'ArrowUp',
  //   'ArrowUp',
  //   'ArrowDown',
  //   'ArrowDown',
  //   'ArrowLeft',
  //   'ArrowRight',
  //   'ArrowLeft',
  //   'ArrowRight',
  //   'b',
  //   'a',
  //   'Enter',
  // ];
  // const [currKey, setCurrKey] = useState(0);

  // const handleKeyDown = (e) => {
  //   const { key } = e;
  //   if (key !== konamiCode[currKey]) {
  //     console.log('fail');
  //     return setCurrKey(0);
  //   }
  //   if (key === konamiCode[currKey] && currKey === 10) {
  //     setCurrKey(0);
  //     return console.log('KONAMI');
  //   }
  //   console.log(currKey);
  //   if (key === konamiCode[currKey]) {
  //     console.log('success');
  //     return setCurrKey(currKey + 1);
  //   }
  // };

  // useEffect(() => {
  //   document.onkeydown = handleKeyDown;
  // }, []);

  const [eventModalShowing, setEventModalShowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

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
    <div className="everything">
      {eventModalShowing !== null &&
        events.map((event) => {
          if (event._id === eventModalShowing) {
            return (
              <Modal
                key={event._id}
                id="event-modal"
                open={eventModalShowing !== null}
                closeIcon
                closeOnDimmerClick
                onClose={() => setEventModalShowing(null)}
              >
                <Modal.Content>
                  <EventModal event={event}/>
                </Modal.Content>
              </Modal>
            );
          }
        })}

      <div className="slideshow">
        <EventSlideshow events={events} loading={loading} setEventModalShowing={setEventModalShowing}/>
      </div>

      <div className="es-div">
        <EventsSection />
      </div>

      <div className="nf-div">
        <Segment className="adopt-section">
          <h1 className="nf-title">Find a New Friend!</h1>
          <div className="nf-wholeSect">
            <div className="nf-sect">
              <Image
                src={adopt}
                position="relative"
                className="adopt-image"
                objectFit="contain"
                alt=""
              />
              <p>
                At vero eos et accus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quosi
                dolores et quas molestias excepturi sint occaecati cupidi non.
                At vero eos et accus et iusto odio dignissimos ducimus qui
                blanditiis At vero eos et accus et iusto odio dignissimos
                ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quosi dolores et quas molestias excepturi sint
                occaecati cupidi non. At vero eos et accus et iusto odio
                dignissimos ducimus qui blanditiis occaecati cupidi non. At vero
                eos et accus et iusto odio dignissimos ducimus qui blanditiis
                occaecati cupidi non. At vero eos et accus et iusto odio
                dignissimos ducimus qui blanditiis occaecati cupidi non.
              </p>
            </div>
            <Button
              color="orange"
              content="Ready To Adopt"
              className="nf-adopt-btn"
              href="/animals"
              role="link"
              // onClick=''
            />
          </div>
        </Segment>
      </div>
    </div>
  );
}
