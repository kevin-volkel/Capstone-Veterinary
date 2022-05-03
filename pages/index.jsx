import Image from 'next/image';
import { Button, Segment } from 'semantic-ui-react';
import Footer from './components/layout/Footer';
import adopt from '../public/media/adoption.png';
import eventImg from '../public/media/event.png';
import fEvents from '../public/media/CAT.png';
import EventSlideshow from './components/events/EventSlideshow';
import EventsSection from './components/events/EventsSection';
import { useEffect, useState } from 'react';
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

  return (
    <div className="everything">
      <div className="slideshow">
        <EventSlideshow />
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
              // onClick=''
            />
          </div>
        </Segment>
      </div>
    </div>
  );
}
