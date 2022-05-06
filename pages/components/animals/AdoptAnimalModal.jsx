import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios';
import catchErrors from '../../util/catchErrors';
import Cookies from 'js-cookie';
import { baseURL } from '../../util/auth';
import VideoUpload from '../layout/VideoUpload';
import AnimalUpload from '../layout/AnimalUpload';
import { editAnimal } from '../../util/animalActions';
import { useRouter } from 'next/router';

const EditAnimalModal = ({ setAnimals, setShowModal, animal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const router = useRouter();

  const defaultAnimalPic =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h1BiFC8Ot5v_yD14xO4Bz4vIVZDFChrIkFtN-XxtnMQAn73Srlyv-vznS5pXLGT-ywE&usqp=CAU';

  const [mediaPreview, setMediaPreview] = useState(animal.picURLs);
  const [media, setMedia] = useState(animal.picURLs);

  const [videoPreview, setVideoPreview] = useState(animal.vidURLs);
  const [video, setVideo] = useState(animal.vidURLs);

  const [newAnimal, setNewAnimal] = useState({
    name: animal.name,
    location: animal.location,
    type: animal.type,
    gender: animal.gender,
    age: animal.age,
    breed: animal.breed,
    neutered: animal.neutered,
    vaccs: animal.vaccs,
    colors: animal.colors || '',
    desc: animal.desc || '',
    details: animal.details || '',
    needs: animal.needs,
    specialNeeds: animal.specialNeeds || '',
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
    } else if (name === 'media' && files.length) {
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
      console.log(media);
    } else if (name === 'video' && files.length) {
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
      console.log(video);
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
        let newImages = false;
        media.forEach((image) => {
          if (typeof image === 'object') {
            formData.append('image', image, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            newImages = true;
          } else if (typeof image === 'string') {
            animalPicURLs.push(image);
          }
        });
        if (newImages) {
          const res = await axios.post('/api/v1/upload/images', formData);
          res.data.sources.forEach((src) => {
            animalPicURLs.push(src);
          });
        }
        console.log(animalPicURLs);
      } else {
        animalPicURLs = [defaultAnimalPic];
      }
      if (media.length !== 0 && !animalPicURLs.length)
        throw new Error('Error while uploading image(s).');

      //VIDEOS
      if (video.length !== 0) {
        const formData = new FormData();
        let newVideos = false;
        video.forEach((vid) => {
          if (typeof vid === 'object') {
            formData.append('video', vid, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            newVideos = true;
          } else if (typeof vid === 'string') {
            animalVidURLs.push(vid);
          }
        });
        if (newVideos) {
          const res = await axios.post('/api/v1/upload/videos', formData);
          res.data.sources.forEach((src) => {
            animalVidURLs.push(src);
          });
        }
        console.log(animalVidURLs);
      }
      if (video.length !== 0 && !animalVidURLs.length)
        throw new Error('Error while uploading video(s)');

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
        animalPicURLs,
        animalVidURLs,
        setAnimals,
        animal._id
      );

      setLoading(false);
      setShowModal(false);
      router.push('/admin');
    } catch (err) {
      console.log(err);
      let caughtErr = catchErrors(err);
      setErrorMsg(caughtErr);
    }
    setLoading(false);
  };

  return (
    <div className='form-wrap'>
      <Form loading={loading} error={errorMsg !== null} onSubmit={handleSubmit}>
        <Message
          error
          header='Oops!'
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <div>
          <h1>Edit Animal</h1>
        </div>
        <div className='uploads'>
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
        <div id='form-group'>
          <Form.Input
            label='Name'
            required
            placeholder='Name'
            value={newAnimal.name}
            name='name'
            onChange={handleChange}
            type='text'
          />
          <Form.Select
            required
            options={locationOptions}
            value={newAnimal.location}
            name='location'
            onChange={handleChange}
            label='Location'
          />
          <Form.Select
            required
            options={typeOptions}
            value={newAnimal.type}
            onChange={handleChange}
            name='type'
            label='Type'
          />
          <Form.Select
            required
            options={genderOptions}
            value={newAnimal.gender}
            onChange={handleChange}
            name='gender'
            label='Gender'
          />
          <Form.Select
            required
            options={ageOptions}
            value={newAnimal.age}
            onChange={handleChange}
            name='age'
            label='Age'
          />
          <Form.Input
            label='Breed'
            placeholder='Breed'
            value={newAnimal.breed === 'unspecified' ? '' : newAnimal.breed}
            name='breed'
            onChange={handleChange}
            type='text'
          />
          <Form.Select
            required
            options={neuteredOptions}
            value={newAnimal.neutered}
            onChange={handleChange}
            name='neutered'
            label='Neutured?'
          />
          <Form.Select
            required
            options={vaccsOptions}
            value={newAnimal.vaccs}
            onChange={handleChange}
            name='vaccs'
            label='Vaccinations Up to Date?'
          />
          <Form.Input
            label='Colors'
            placeholder='Colors'
            value={newAnimal.colors}
            name='colors'
            onChange={handleChange}
            type='text'
          />
          <Form.TextArea
            label='Description'
            placeholder='Add a short description of the animal...'
            value={newAnimal.desc}
            name='desc'
            onChange={handleChange}
            type='text'
          />
          <Form.TextArea
            label='Details'
            placeholder="List some of the animal's characteristics..."
            value={newAnimal.details}
            name='details'
            onChange={handleChange}
            type='text'
          />
          <Form.Select
            required
            options={needsOptions}
            value={newAnimal.needs}
            onChange={handleChange}
            name='needs'
            label='Any Special Needs?'
          />
          {newAnimal.needs === true && (
            <Form.TextArea
              placeholder='Special Needs...'
              value={newAnimal.specialNeeds}
              name='specialNeeds'
              onChange={handleChange}
              type='text'
            />
          )}
        </div>
        <div className='button-div'>
          <Button disabled={loading} id='add-animal-btn' content='Done' fluid />
        </div>
      </Form>
    </div>
  );
};

export default EditAnimalModal;
