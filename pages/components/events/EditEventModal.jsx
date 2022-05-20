import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import catchErrors from "../../util/catchErrors";
import EventUpload from "../layout/EventUpload";
import { editEvent } from "../../util/eventActions";
// import { useRouter } from "next/router";
import defaultEventPic from "../../../public/media/home-page-banner.jpg";

const EditEventModal = ({ setEvents, setShowModal, event }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mediaPreview, setMediaPreview] = useState(event.bannerPic);
  const [media, setMedia] = useState(event.bannerPic);

  const [newEvent, setNewEvent] = useState({
    title: event.title,
    desc: event.desc,
    date: event.date.substring(0, 10),
    type: event.type,
    otherType:
      event.type !== "adoption" || event.type !== "fundraiser"
        ? event.type
        : "",
    featured: event.featured,
    location: event.location,
    bannerPic: event.bannerPic,
  });

  const handleChange = (e, data) => {
    const { name, value, files } = e.target;

    if (!name) {
      setNewEvent((prev) => ({
        ...prev,
        [data.name]: data.value,
      }));
    } else if (name == "media" && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let eventPicUrl = "";

    try {
      //IMAGES
      if (media !== null) {
        const formData = new FormData();
        let newImage = false;
        if (typeof media === "object") {
          formData.append("image", media, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          newImage = true;
        } else if (typeof media === "string") {
          eventPicUrl = media;
        }
        if (newImage) {
          const res = await axios.post("/api/v1/upload", formData);
          eventPicUrl = res.data.src;
        }
      } else {
        eventPicUrl = defaultEventPic.src;
      }
      if (media !== null && !eventPicUrl) throw new Error("Cloudinary Error");

      const [year, month, day] = newEvent.date.split("-");
      const newDate = `${year}-${month}-${day}`;

      // console.log(newDate);

      let eventDate = new Date(newDate);

      if (newEvent.otherType !== "" && newEvent.type === "other") {
        newEvent.type = newEvent.otherType;
      }

      await editEvent(
        newEvent.title,
        newEvent.desc,
        eventDate,
        newEvent.type,
        eventPicUrl,
        newEvent.location,
        newEvent.featured,
        setEvents,
        event._id
      );

      setLoading(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
      let caughtErr = catchErrors(err);
      setErrorMsg(caughtErr);
    }
    setLoading(false);
  };

  const typeOptions = [
    {
      text: "Fundraiser",
      value: "fundraiser",
      key: 0,
    },
    {
      text: "Adoption",
      value: "adoption",
      key: 1,
    },
    {
      text: "Other",
      value: "other",
      key: 2,
    },
  ];

  const featuredOptions = [
    {
      text: "No",
      value: false,
      key: 0,
    },
    {
      text: "Yes",
      value: true,
      key: 1,
    },
  ];

  return (
    <div className="form-wrap">
      <Form loading={loading} error={errorMsg !== null} onSubmit={handleSubmit}>
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <div>
          <h1>Edit Event</h1>
        </div>
        <div className="uploads">
          <EventUpload
            handleChange={handleChange}
            media={media}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
          />
        </div>
        <div id="form-group">
          <Form.Input
            label="Title"
            required
            placeholder="Title"
            value={newEvent.title}
            name="title"
            onChange={handleChange}
            type="text"
          />
          <Form.Input
            label="Date"
            required
            placeholder="Date"
            value={newEvent.date}
            name="date"
            onChange={handleChange}
            type="date"
          />
          <Form.Input
            label="Location"
            required
            value={newEvent.location}
            name="location"
            onChange={handleChange}
            type="text"
            placeholder="Location"
          />
          <div id="event-group">
            <div id="event-type">
              <Form.Select
                required
                options={typeOptions}
                value={
                  newEvent.type == "adoption" || newEvent.type == "fundraiser"
                    ? newEvent.type
                    : "other"
                }
                name="type"
                onChange={handleChange}
                label="Type"
              />
              {newEvent.type !== "adoption" &&
                newEvent.type !== "fundraiser" && (
                  <Form.Input
                    required
                    placeholder="Other..."
                    value={newEvent.otherType}
                    name="otherType"
                    onChange={handleChange}
                    type="text"
                  />
                )}
            </div>
            <Form.Select
              required
              options={featuredOptions}
              value={newEvent.featured}
              name="featured"
              onChange={handleChange}
              label="Featured"
            />
          </div>
          <Form.TextArea
            required
            value={newEvent.desc}
            onChange={handleChange}
            name="desc"
            label="Description"
            type="text"
            placeholder="Add a short description of the event..."
          />
        </div>
        <div className="button-div">
          <Button disabled={loading} id="add-event-btn" content="Done" fluid />
        </div>
      </Form>
    </div>
  );
};

export default EditEventModal;
