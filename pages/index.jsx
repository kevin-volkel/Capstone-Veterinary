import Image from "next/image";
import { Button, Segment, Modal } from "semantic-ui-react";
import Footer from "./components/layout/Footer";
import adopt from "../public/media/adoption.png";
import eventImg from "../public/media/event.png";
import fEvents from "../public/media/CAT.png";
import EventSlideshow from "./components/events/EventSlideshow";
import EventsSection from "./components/events/EventsSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { sortDates } from "./util/dateFuncs";
import EventModal from "./components/events/EventModal";
import HomeUpload from "./components/layout/HomeUpload";
import { baseURL } from "./util/auth";

//import "../styles/home.css";
// import bannerPic from "../public/media/home-page-banner.jpg";

export default function Home({ user }) {
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

  const [adoptMedia, setAdoptMedia] = useState(null); // media
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);

  const handleChange = async (e) => {
    const { name, files } = e.target;
    if (name == "media" && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(adoptImage);
    console.log(media);
    console.log(mediaPreview);

    // setLoading(true);

    // let adoptPicUrl = "";

    // try {
    //   if (media !== null) {
    //     const formData = new FormData();
    //     formData.append("image", media, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     const res = await axios.post("/api/v1/upload", formData);
    //     adoptPicUrl = res.data.src;
    //   } else {
    //     adoptPicUrl = adopt.src;
    //   }

    //   if (media !== null && !adoptPicUrl) throw new Error("Cloudinary Error");

    //   const res = await axios.post(
    //     "/api/v1/upload/media",
    //     { media },
    //     {
    //       headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    //     }
    //   );

    //  console.log(res.data);

    //   setAdoptMedia(res.data);

    //   setMedia(null);
    //   setMediaPreview(null);
    // } catch (err) {
    //   console.log(err);
    //   let caughtErr = catchErrors(err);
    //   setErrorMsg(caughtErr);
    // }
    // setLoading(false);
  };

  useEffect(async () => {
    setLoading(true);
    await fetchEvents();
    // await fetchMedia();
    setLoading(false);
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get(`/api/v1/event`);
    const events = res.data.sort(sortDates);
    setEvents(events);
  };

  // const fetchMedia = async () => {
  //   const res = await axios.get(`/api/v1/upload/media`);
  //   const media = res.data;
  //   console.log(media);
  //   if(media === null) return;
  //   setAdoptMedia(media);
  // };

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
                closeOnDimmerClick
                onClose={() => setEventModalShowing(null)}
              >
                <Modal.Content>
                  <EventModal
                    event={event}
                    setEventModalShowing={setEventModalShowing}
                  />
                </Modal.Content>
              </Modal>
            );
          }
        })}

      <div className="slideshow">
        <EventSlideshow
          events={events}
          loading={loading}
          setEventModalShowing={setEventModalShowing}
        />
      </div>

      <div className="es-div">
        <EventsSection />
      </div>

      <div className="nf-div">
        <Segment className="adopt-section">
          <h1 className="nf-title">Find a New Friend!</h1>
          <div className="nf-wholeSect">
            <div className="nf-sect">
              {user ? (
                // <HomeUpload
                //   adoptMedia={adoptMedia}
                //   media={media}
                //   mediaType={adoptMedia.type}
                //   handleChange={handleChange}
                //   mediaPreview={mediaPreview}
                //   defaultHomePic={adopt.src}
                //   handleSubmit={handleSubmit}
                // />
                <></>
              ) : (
                <Image
                  src={adoptMedia === null ? adopt : adoptMedia}
                  // src={adopt}
                  position="relative"
                  className="adopt-image"
                  objectFit="contain"
                  alt="adopt image"
                />
              )}
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
