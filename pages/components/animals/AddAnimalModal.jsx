import React, { useState } from "react";
import {
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import catchErrors from "../../util/catchErrors";
import Cookies from "js-cookie";
import VideoUpload from "../layout/VideoUpload";
import AnimalUpload from "../layout/AnimalUpload";
import dogDefault from "../../../public/media/dog-profile.png"

const AddAnimalModal = ({ setAnimals, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mediaPreview, setMediaPreview] = useState([]);
  const [media, setMedia] = useState([]);

  const [videoPreview, setVideoPreview] = useState([]);
  const [video, setVideo] = useState([]);

  const defaultAnimalPic =
    {dogDefault};

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    location: "northeast",
    type: "dog",
    gender: "male",
    age: "young",
    breed: "",
    neutered: false,
    vaccs: false,
    colors: "",
    desc: "",
    details: "",
    needs: false,
    specialNeeds: "",
    picURLs: [],
    vidURLs: [],
  });

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
      } else {
        animalPicURLs = [defaultAnimalPic];
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

      const res = await axios.post(
        "/api/v1/animal",
        {
          name: newAnimal.name.trim(),
          age: newAnimal.age,
          type: newAnimal.type,
          breed: newAnimal.breed.trim(),
          gender: newAnimal.gender,
          colors: newAnimal.colors.trim(),
          needs: newAnimal.needs,
          specialNeeds: newAnimal.specialNeeds.trim(),
          details: newAnimal.details.trim(),
          desc: newAnimal.desc.trim(),
          vaccs: newAnimal.vaccs,
          neutered: newAnimal.neutered,
          picURLs: animalPicURLs,
          vidURLs: animalVidURLs,
          location: newAnimal.location,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      setAnimals((prev) => [res.data, ...prev]);

      setNewAnimal({
        name: "",
        location: "northeast",
        type: "dog",
        gender: "male",
        age: "young",
        breed: "",
        neutered: false,
        vaccs: false,
        colors: "",
        desc: "",
        details: "",
        needs: false,
        specialNeeds: "",
        picURLs: [],
        vidURLs: [],
      });

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
          <h1>Add Animal</h1>
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
            value={newAnimal.breed}
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

export default AddAnimalModal;
