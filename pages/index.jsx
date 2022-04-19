import Image from "next/image";
import { Button, Segment } from "semantic-ui-react";
import Footer from "./components/layout/Footer";
import adopt from "../public/media/adoption.png";
import eventImg from "../public/media/event.png";
import fEvents from "../public/media/CAT.png";
import EventSlideshow from "./components/events/EventSlideshow";
//import "../styles/home.css";
// import bannerPic from "../public/media/home-page-banner.jpg";

export default function Home() {
  return (
    <div className="everything">
      <div className="slideshow">
        <EventSlideshow />
      </div>

      <div className="nf-div">
        <Segment className="events-section">
          <h1 className="nf-title">Featured Events</h1>
          <div className="nf-wholeSect">
          <div className="nf-sect">
            <Image
              src={eventImg}
              position="relative"
              className="adopt-image"
              objectFit="contain"
            />
            <p>
              At vero eos et accus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quosi
              dolores et quas molestias excepturi sint occaecati cupidi non. At
              vero eos et accus et iusto odio dignissimos ducimus qui blanditiis
              At vero eos et accus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quosi
              dolores et quas molestias excepturi sint occaecati cupidi non. At
              vero eos et accus et iusto odio dignissimos ducimus qui blanditiis
            </p>
          </div>
          <Button
            color="white"
            content="Check Out Events"
            className="nf-event-btn"
            onClick=""
          />
          </div>
        </Segment>
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
                dignissimos ducimus qui blanditiis
              </p>
            </div>
            <Button
              color="orange"
              content="Ready To Adopt"
              className="nf-adopt-btn"
              onClick=""
            />
          </div>
        </Segment>
      </div>

      <Footer />
    </div>
  );
}
