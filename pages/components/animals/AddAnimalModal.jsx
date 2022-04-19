import React, { useState } from "react";
import { Form, Segment, Button, Message } from "semantic-ui-react";
import { setToken } from "../../util/auth";
import axios from "axios";
import catchErrors from "../../util/catchErrors";
import Cookies from "js-cookie";
import { baseURL } from "../../util/auth";
import PhotoUpload from "../layout/PhotoUpload";

const AddAnimalModal = ({ user, setAnimals }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);

  const defaultAnimalPic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h1BiFC8Ot5v_yD14xO4Bz4vIVZDFChrIkFtN-XxtnMQAn73Srlyv-vznS5pXLGT-ywE&usqp=CAU";

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
    breed: "unspecified",
    neutered: false,
    vaccs: false,
    colors: "",
    desc: "",
    details: "",
    needs: false,
    specialNeeds: [],
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
    } else if (name == "media" && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    } else {
      setNewAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (e, data) => {
    const {name, value} = data;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: [value],
    }));
  }

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

  //     if (media !== null && !profilePicURL) throw new Error("Cloudinary Error");

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
  //       breed: "unspecified",
  //       neutered: false,
  //       vaccs: false,
  //       colors: "",
  //       desc: "",
  //       details: "",
  //       needs: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newAnimal);
  }
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
        onSubmit={handleSubmit}
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
          <div
            className="upload-image"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>Add Animal</h1>

            {/* <PhotoUpload
              mediaPreview={mediaPreview}
              defaultProfilePic={defaultAnimalPic}
              handleChange={handleChange}
            /> */}
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
              placeholder="List some of the animals characteristics..."
              value={newAnimal.details}
              name="details"
              onChange={handleChange}
              type="text"
            />
            <Form.Select
              options={booleanOptions}
              value={newAnimal.needs}
              onChange={handleChange}
              name="needs"
              label="Any Special Needs?"
            />
            {newAnimal.needs && (
              <Form.Input
                required
                label="Special Need"
                placeholder="Special Need"
                value={newAnimal.specialNeeds[0]}
                name="specialNeeds"
                // onChange={handleArrayChange}
                type="text"
              />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button id="register-btn" content="Done" fluid />
          </div>
        </Segment>
      </Form>
    </div>
  );
};

export default AddAnimalModal;
