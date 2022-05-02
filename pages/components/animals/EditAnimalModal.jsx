import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { setToken } from "../../util/auth";
import axios from "axios";
import catchErrors from "../../util/catchErrors";
import Cookies from "js-cookie";
import { baseURL } from "../../util/auth";
import VideoUpload from "../layout/VideoUpload";
import AnimalUpload from "../layout/AnimalUpload";
import { editAnimal } from "../../util/animalActions";

const EditAnimalModal = ({ user, setAnimals, setShowModal, animal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const defaultAnimalPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h1BiFC8Ot5v_yD14xO4Bz4vIVZDFChrIkFtN-XxtnMQAn73Srlyv-vznS5pXLGT-ywE&usqp=CAU";

  const [mediaPreview, setMediaPreview] = useState(animal.picURLs);
  const [media, setMedia] = useState(animal.picURLs);

  const [videoPreview, setVideoPreview] = useState(animal.vidURLs);
  const [video, setVideo] = useState(animal.vidURLs);

  const [newAnimal, setNewAnimal] = useState(animal);

  const handleChange = (e, data) => {
    const { name, value, files } = e.target;

    if (!name) {
      setNewAnimal((prev) => ({
        ...prev,
        [data.name]: data.value,
      }));
    } else if (name === "media" && files.length) {
      if (files.length === 1) {
        let droppedFiles = Object.values(files);
        setMedia((prev) => [...prev, droppedFiles[0]]);
        setMediaPreview((prev) => [
          ...prev,
          URL.createObjectURL(droppedFiles[0]),
        ]);
      } else {
        let droppedFiles = Object.values(files);
        droppedFiles.map((file) => {
          setMedia((prev) => [...prev, file]);
          setMediaPreview((prev) => [...prev, URL.createObjectURL(file)]);
        });
      }
      // console.log(media);
    } else if (name === "video" && files.length) {
      if (files.length === 1) {
        let droppedFiles = Object.values(files);
        setVideo((prev) => [...prev, droppedFiles[0]]);
        setVideoPreview((prev) => [
          ...prev,
          URL.createObjectURL(droppedFiles[0]),
        ]);
      } else {
        let droppedFiles = Object.values(files);
        droppedFiles.map((file) => {
          setVideo((prev) => [...prev, file]);
          setVideoPreview((prev) => [...prev, URL.createObjectURL(file)]);
        });
      }
    } else {
      setNewAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let animalPicURLs = [];
    let animalVidURLs = [];

    console.log(media); //!error here
    console.log(video);

    try {
      //IMAGES
      if (media.length !== 0) {
        const formData = new FormData();
        media.forEach((image) => {
          formData.append("image", image, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        });
        const res = await axios.post("/api/v1/upload/images", formData);
        animalPicURLs = res.data.sources;
      }
      if (media.length !== 0 && !animalPicURLs.length)
        throw new Error("Error while uploading image(s).");

      //VIDEOS
      if (video.length !== 0) {
        const formData = new FormData();
        video.forEach((vid) => {
          formData.append("video", vid, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        });
        const res = await axios.post("/api/v1/upload/videos", formData);
        animalVidURLs = res.data.sources;
      }
      if (video.length !== 0 && !animalVidURLs.length)
        throw new Error("Error while uploading video(s)");

      await editAnimal(
        newAnimal.name,
        newAnimal.location,
        newAnimal.type,
        newAnimal.gender,
        newAnimal.age,
        newAnimal.breed,
        newAnimal.neutered,
        newAnimal.vaccs,
        newAnimal.colors,
        newAnimal.desc,
        newAnimal.details,
        newAnimal.needs,
        newAnimal.specialNeeds,
        newAnimal.picURLs,
        newAnimal.vidURLs,
        setAnimals,
        newAnimal._id
      );

      setMedia([]);
      setVideo([]);
      setVideoPreview([]);
      setMediaPreview([]);
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
      text: "Dog",
      value: "dog",
      key: 0,
    },
    {
      text: "Cat",
      value: "cat",
      key: 1,
    },
  ];

  const ageOptions = [
    {
      text: "Young",
      value: "young",
      key: 0,
    },
    {
      text: "Adult",
      value: "adult",
      key: 1,
    },
    {
      text: "Senior",
      value: "senior",
      key: 2,
    },
  ];

  const genderOptions = [
    {
      text: "Male",
      value: "male",
      key: 0,
    },
    {
      text: "Female",
      value: "female",
      key: 1,
    },
  ];

  const locationOptions = [
    {
      text: "Northeast Campus",
      value: "northeast",
      key: 0,
    },
    {
      text: "Northwest Campus",
      value: "northwest",
      key: 1,
    },
    {
      text: "Southwest Campus",
      value: "southwest",
      key: 2,
    },
  ];

  const neuteredOptions = [
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

  const vaccsOptions = [
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

  const needsOptions = [
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
          <h1>Edit Animal</h1>
        </div>
        <div className="uploads">
          <AnimalUpload
            handleChange={handleChange}
            media={media}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
          />
          <VideoUpload
            handleChange={handleChange}
            videoPreview={videoPreview}
            setVideoPreview={setVideoPreview}
            setVideo={setVideo}
            video={video}
          />
        </div>
        <div id="form-group">
          <Form.Input
            label="Name"
            required
            placeholder="Name"
            value={newAnimal.name}
            name="name"
            onChange={handleChange}
            type="text"
          />
          <Form.Select
            required
            options={locationOptions}
            value={newAnimal.location}
            name="location"
            onChange={handleChange}
            label="Location"
          />
          <Form.Select
            required
            options={typeOptions}
            value={newAnimal.type}
            onChange={handleChange}
            name="type"
            label="Type"
          />
          <Form.Select
            required
            options={genderOptions}
            value={newAnimal.gender}
            onChange={handleChange}
            name="gender"
            label="Gender"
          />
          <Form.Select
            required
            options={ageOptions}
            value={newAnimal.age}
            onChange={handleChange}
            name="age"
            label="Age"
          />
          <Form.Input
            label="Breed"
            placeholder="Breed"
            value={newAnimal.breed === "unspecified" ? "" : newAnimal.breed}
            name="breed"
            onChange={handleChange}
            type="text"
          />
          <Form.Select
            required
            options={neuteredOptions}
            value={newAnimal.neutered}
            onChange={handleChange}
            name="neutered"
            label="Neutured?"
          />
          <Form.Select
            required
            options={vaccsOptions}
            value={newAnimal.vaccs}
            onChange={handleChange}
            name="vaccs"
            label="Vaccinations Up to Date?"
          />
          <Form.Input
            label="Colors"
            placeholder="Colors"
            value={newAnimal.colors}
            name="colors"
            onChange={handleChange}
            type="text"
          />
          <Form.TextArea
            label="Description"
            placeholder="Add a short description of the animal..."
            value={newAnimal.desc}
            name="desc"
            onChange={handleChange}
            type="text"
          />
          <Form.TextArea
            label="Details"
            placeholder="List some of the animal's characteristics..."
            value={newAnimal.details}
            name="details"
            onChange={handleChange}
            type="text"
          />
          <Form.Select
            required
            options={needsOptions}
            value={newAnimal.needs}
            onChange={handleChange}
            name="needs"
            label="Any Special Needs?"
          />
          {newAnimal.needs === true && (
            <Form.TextArea
              placeholder="Special Needs..."
              value={newAnimal.specialNeeds}
              name="specialNeeds"
              onChange={handleChange}
              type="text"
            />
          )}
        </div>
        <div className="button-div">
          <Button disabled={loading} id="add-animal-btn" content="Done" fluid />
        </div>
      </Form>
    </div>
  );
};

export default EditAnimalModal;
