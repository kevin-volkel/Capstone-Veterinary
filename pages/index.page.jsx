import { Button, Segment, Modal } from "semantic-ui-react";
import adopt from "../public/media/adoption.png";
import EventSlideshow from "./components/events/EventSlideshow";
// import EventsSection from "./components/events/EventsSection";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { sortDates } from "./util/dateFuncs";
import EventModal from "./components/events/EventModal";
import HomeUpload from "./components/layout/HomeUpload";
import catchErrors from "./util/catchErrors";

//import "../styles/home.css";
// import bannerPic from "../public/media/home-page-banner.jpg";

export default function Home({ user }) {
  const [eventModalShowing, setEventModalShowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  // const [featuredEvents, setFeaturedEvents] = useState([]);

  const [mediaURL, setMediaURL] = useState(null);
  const [mediaType, setMediaType] = useState(null);

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

    setLoading(true);

    let newMediaUrl;

    let type;
    if (media !== null) {
      type = media.type.substring(0, 5);
    }

    try {
      if (media !== null && type === "image") {
        const formData = new FormData();
        formData.append("image", media, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const res = await axios.post("/api/v1/upload", formData);
        newMediaUrl = res.data.src;
      }

      if (media !== null && type === "video") {
        const formData = new FormData();
        formData.append("video", media, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const res = await axios.post("/api/v1/upload/videos", formData);
        newMediaUrl = res.data.sources[0];
      }

      if (media !== null && !newMediaUrl) throw new Error("Cloudinary Error");

      const res = await axios.post(
        "/api/v1/upload/media",
        { media: newMediaUrl, type },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      console.log(res.data);

      setMediaURL(res.data.media);
      setMediaType(res.data.type);

      setMedia(null);
      setMediaPreview(null);
    } catch (err) {
      console.log(err);
      catchErrors(err);
    }

    setLoading(false);
  };

  useEffect(async () => {
    setLoading(true);
    await fetchEvents();
    // await fetchFeaturedEvents();
    await fetchMedia();
    setLoading(false);
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get(`/api/v1/event`);
    const events = res.data.sort(sortDates);
    setEvents(events);
  };

  // const fetchFeaturedEvents = async () => {
  //   const res = await axios.get(`/api/v1/event/featured`);
  //   const featuredEvents = res.data;
  //   console.log(featuredEvents);
  //   setFeaturedEvents(featuredEvents);
  // };

  const fetchMedia = async () => {
    const res = await axios.get(`/api/v1/upload/media`);
    if (res.data === null) return;

    let media = res.data.media;
    let type = res.data.type;

    console.log(media);
    console.log(type);

    setMediaURL(media);
    setMediaType(type);
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

      {/* <div className="es-div"> */}
        {/* <div className="events-map"> */}
        {/* <h1>Featured Events</h1> */}
          {/* {featuredEvents.length &&
            featuredEvents.map((event, index) => {
              return <EventsSection event={event} index={index} user={user} />;
            })} */}
          {/* <EventsSection />; */}
        {/* </div> */}
      {/* </div> */}

      <div className="nf-div">
        <Segment className="adopt-section">
          <h1 className="nf-title">Find a New Friend!</h1>
          <div className="nf-wholeSect">
            <div className="nf-sect">
              <HomeUpload
                user={user || null}
                mediaURL={mediaURL}
                media={media}
                mediaType={mediaType}
                handleChange={handleChange}
                mediaPreview={mediaPreview}
                defaultHomePic={adopt.src}
                handleSubmit={handleSubmit}
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
