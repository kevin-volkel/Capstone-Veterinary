import React, { useState } from 'react';
import {
  Form,
  Segment,
  Button,
  Message,
  Divider,
  Header,
} from 'semantic-ui-react';
import axios from 'axios';
import catchErrors from '../../util/catchErrors';
import Cookies from 'js-cookie';

import EventUpload from '../layout/EventUpload';

const AddEventModal = ({ user, setAnimals, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [mediaPreview, setMediaPreview] = useState([]);
  const [media, setMedia] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    desc: '',
    date: '',
    type: '',
    location: '',
    bannerPic: '',
  });

  const handleChange = (e, data) => {
    const { name, value, files } = e.target;

    if (!name) {
      setNewEvent((prev) => ({
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

    let animalPicURLs = [];

    try {
      //IMAGES
      if (media.length !== 0) {
        const formData = new FormData();
        media.forEach((image) => {
          formData.append('image', image, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        });
        const res = await axios.post('/api/v1/upload/images', formData);
        animalPicURLs = res.data.sources;
      } else {
        animalPicURLs = [defaultAnimalPic];
      }
      if (media.length !== 0 && !animalPicURLs.length)
        throw new Error('Error while uploading image(s).');

      const res = await axios.post(
        '/api/v1/event',
        {
          user,
          title: newEvent.title.trim(),
          desc: newEvent.desc.trim(),
          date: new Date(newEvent.date),
          type: newEvent.type.trim(),
          bannerPic: newEvent.bannerPic,
          location: newEvent.location,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        }
      );

      setAnimals((prev) => [res.data, ...prev]);

      setNewEvent({
        title: '',
        location: 'northeast',
        type: 'dog',
        gender: 'male',
        age: 'young',
        breed: '',
        neutered: false,
        vaccs: false,
        colors: '',
        desc: '',
        details: '',
        needs: false,
        specialNeeds: '',
        picURLs: [],
      });

      setMedia([]);
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
          <h1>Add Event</h1>
        </div>
        <div className='uploads'>
          <EventUpload
            handleChange={handleChange}
            media={media}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
          />
        </div>
        <div id='form-group'>
          <Form.Input
            label='Title'
            required
            placeholder='Title'
            value={newEvent.name}
            name='title'
            onChange={handleChange}
            type='text'
          />
          <Form.Input
            label='Location'
            required
            value={newEvent.location}
            name='location'
            onChange={handleChange}
            type='text'
            placeholder='Location'
          />
          <Form.Input
            required
            value={newEvent.desc}
            onChange={handleChange}
            name='desc'
            label='Description'
            placeholder='Description'
          />
          <Form.Input
            required
            value={newEvent.gender}
            onChange={handleChange}
            name='gender'
            label='Date'
            type='date'
          />
        </div>
        <div className='button-div'>
          <Button disabled={loading} id='add-animal-btn' content='Done' fluid />
        </div>
      </Form>
    </div>
  );
};

export default AddEventModal;
