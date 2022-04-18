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
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const defaultAnimalPic = "http://clipart-library.com/img/1678353.png"

  const postAxios = axios.create({
    baseURL: `${baseURL}/api/v1/posts`,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });

  const [newAnimal, setNewAnimal] = useState({
    name: null,
    age: null,
    type: null,
    breed: null,
    gender: null,
    colors: null,
    needs: null,
    details: null,
    desc: null,
    vaccs: null,
    neutered: null,
    picURLs: null,
    vidURLs: null,
    location: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media" && files.length) {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    } else {
      setNewAnimal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let animalPicURLs = [];

    try {
      if (media !== null) {
        const formData = new FormData();
        formData.append("image", media, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const res = await axios.post('/api/v1/upload', formData);
        animalPicURLs.push(res.data.src);
      }else{
        animalPicURLs.push(defaultAnimalPic);
      }

      if (media !== null && !profilePicURL) throw new Error('Cloudinary Error');
      
      const res = await postAxios.post("/api/v1/animal", {
        name,
        age,
        type,
        breed,
        gender,
        colors,
        needs,
        details,
        desc,
        vaccs,
        neutered,
        picURLs: animalPicURLs,
        vidURLs,
        location,
      });
      setAnimals((prev) => [res.data, ...prev]);
      setNewAnimal({
        name: null,
        age: null,
        type: null,
        breed: null,
        gender: null,
        colors: null,
        needs: null,
        details: null,
        desc: null,
        vaccs: null,
        neutered: null,
        picURLs: null,
        vidURLs: null,
        location: null,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      let caughtErr = catchErrors(err);
      setErrorMsg(caughtErr);
    }

    setLoading(false);
  };

  return (
    <div className="form-wrap">
      <Form
        loading={loading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
        id="add-animal"
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <div className="upload-image" style={{display: "flex", justifyContent: "space-between"}}>
            <h1>Add Animal</h1>
            <PhotoUpload
              mediaPreview={mediaPreview}
              defaultAnimalPic={defaultAnimalPic}
              handleChange={handleChange}
            />
          </div>
          <div id="form-group">
            <Form.Input
              label="Name"
              required
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              type="text"
            />
          </div>
        </Segment>
      </Form>
    </div>
  );
};

export default AddAnimalModal;
