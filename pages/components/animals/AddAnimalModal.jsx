import React, { useState } from "react";
import { Form, Segment, Button, Message, Divider } from "semantic-ui-react";
import { setToken } from "../../util/auth";
import axios from "axios";
import catchErrors from "../../util/catchErrors";
import Cookies from "js-cookie";
import { baseURL } from "../../util/auth";
import PhotoUpload from "../layout/PhotoUpload";
import VideoUpload from "../layout/VideoUpload";

const AddAnimalModal = ({ user, setAnimals }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);

  const [videoPreview, setVideoPreview] = useState(null);
  const [video, setVideo] = useState([]);
  const inputRef = React.useRef(null);

  const defaultAnimalPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h1BiFC8Ot5v_yD14xO4Bz4vIVZDFChrIkFtN-XxtnMQAn73Srlyv-vznS5pXLGT-ywE&usqp=CAU";

  const defaultVideoPic =
    "https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA=";

  const postAxios = axios.create({
    baseURL: `${baseURL}/api/v1/posts`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });

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
    // console.log(e.target.files);

    if (!name) {
      setNewAnimal((prev) => ({
        ...prev,
        [data.name]: data.value,
      }));
    } else if (name == "media" && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    } else if (name == "video" && files.length) {
      //!try maping through droppedFiles and pushing each to video & setVideoPreview to video[0]
      let droppedFiles = Object.values(files)
      setVideoPreview(() => URL.createObjectURL(droppedFiles[0]));
      setVideo(() => droppedFiles);
    } else {
      setNewAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   let animalPicURLs = [];
  //   let animalVidURLs = [];

  //   try {
  //     if (media !== null) {
  //       const formData = new FormData();
  //       formData.append("image", media, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       const res = await axios.post("/api/v1/upload", formData);
  //       animalPicURLs.push(res.data.src);
  //     } else {
  //       animalPicURLs.push(defaultAnimalPic);
  //     }

  //     if (media !== null && !profilePicURL) throw new Error("Cloudinary Error Pic");

  //     //VIDEO
  //     if (video !== null) {
  //       const formData = new FormData();
  //       formData.append("video", video, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       const res = await axios.post("/api/v1/upload", formData);
  //       animalVidURLs.push(res.data.src);
  //     } else {
  //       animalVidURLs.push(defaultVideoPic);
  //     }

  //     if (video !== null && !profilePicURL) throw new Error("Cloudinary Error Video");

  //     const res = await postAxios.post("/api/v1/animal", user, {
  //       name: newAnimal.name.trim().toLowerCase(),
  //       age: newAnimal.age,
  //       type: newAnimal.type,
  //       breed: newAnimal.breed.trim().toLowerCase(),
  //       gender: newAnimal.gender,
  //       colors: newAnimal.colors.trim().toLowerCase(),
  //       needs: newAnimal.needs,
  //       details: newAnimal.details,
  //       desc: newAnimal.desc,
  //       vaccs: newAnimal.vaccs,
  //       neutered: newAnimal.neutered,
  //       picURLs: animalPicURLs,
  //       vidURLs: animalVidURLs,
  //       location: newAnimal.location,
  //     });
  //     setAnimals((prev) => [res.data, ...prev]);
  //     setNewAnimal({
  //       name: "",
  //       location: "northeast",
  //       type: "dog",
  //       gender: "male",
  //       age: "young",
  //       breed: "",
  //       neutered: false,
  //       vaccs: false,
  //       colors: "",
  //       desc: "",
  //       details: "",
  //       needs: false,
  //       specialNeeds: "",
  //       picURLs: [],
  //       vidURLs: [],
  //     });
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     let caughtErr = catchErrors(err);
  //     setErrorMsg(caughtErr);
  //   }

  //   setLoading(false);
  // };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(newAnimal);
    // setLoading(true);

    // let animalPicURLs = [];
    // let animalVidURLs = [];

    if (media !== null) {
      console.log(media);
    }
    if (video !== null) {
      console.log(video);
    }
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

  const booleanOptions = [
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
      <Form
        loading={loading}
        error={errorMsg !== null}
        onSubmit={handleSubmit2}
        id="add-animal"
        style={{ width: "80%" }}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Add Animal</h1>
          </div>
          <div id="form-group">
            <PhotoUpload
              mediaPreview={mediaPreview}
              defaultProfilePic={defaultAnimalPic}
              handleChange={handleChange}
            />
            <VideoUpload
              handleChange={handleChange}
              inputRef={inputRef}
              videoPreview={videoPreview}
              setVideoPreview={setVideoPreview}
              setVideo={setVideo}
              video={video}
            />
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
              options={booleanOptions}
              value={newAnimal.neutered}
              onChange={handleChange}
              name="neutered"
              label="Neutured?"
            />
            <Form.Select
              required
              options={booleanOptions}
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
              options={booleanOptions}
              value={newAnimal.needs}
              onChange={handleChange}
              name="needs"
              label="Any Special Needs?"
            />
            {newAnimal.needs && (
              <Form.TextArea
                // label="Special"
                placeholder="Special Needs..."
                value={newAnimal.specialNeeds}
                name="specialNeeds"
                onChange={handleChange}
                type="text"
              />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              id="register-btn"
              content="Done"
              fluid
              style={{ margin: "1rem 0" }}
            />
          </div>
        </Segment>
      </Form>
    </div>
  );
};

export default AddAnimalModal;
