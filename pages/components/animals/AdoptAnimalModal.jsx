import React, { useState } from 'react';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import catchErrors from '../../util/catchErrors';
import EventUpload from '../layout/EventUpload';
import { addEvent } from '../../util/eventActions';

const AdoptAnimalModal = ({ setEvents, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [newAdopt, setNewAdopt] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    otherAnimals: false,
    smallChildren: false,
    aboutYou: '',
  });

  const handleChange = (e, data) => {
    const { name, value, files } = e.target;
    console.log(value);
    if (!name) {
      setNewAdopt((prev) => ({
        ...prev,
        [data.name]: data.value,
      }));
    } else {
      setNewAdopt((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newAdopt.otherType !== '' && newAdopt.type === 'other') {
        newAdopt.type = newAdopt.otherType.trim();
      }
      await addEvent(
        newAdopt.name,
        newAdopt.phoneNumber,
        newAdopt.email,
        newAdopt.otherAnimals,
        newAdopt.smallChildren,
        newAdopt.aboutYou
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

  const featuredOptions = [
    {
      text: 'No',
      value: false,
      key: 0,
    },
    {
      text: 'Yes',
      value: true,
      key: 1,
    },
  ];

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
          <h1>Contact Us!</h1>
        </div>
        <div id='form-group'>
          <Form.Input
            label='Name'
            required
            placeholder='Full Name'
            value={newAdopt.fullName}
            name='fullName'
            onChange={handleChange}
            type='text'
          />
          <Form.Input
            label='Phone Number'
            required
            placeholder='000-000-0000'
            value={newAdopt.phoneNumber}
            name='phoneNumber'
            onChange={handleChange}
            type='text'
          />
          <Form.Input
            label='Email'
            required
            value={newAdopt.email}
            name='email'
            onChange={handleChange}
            type='email'
            placeholder='Email'
          />
          <Form.TextArea
            label='About You'
            placeholder='Tell us about you!'
            value={newAdopt.aboutYou}
            name='aboutYou'
            onChange={handleChange}
            type='text'
          />
          <div className='checkboxes'>
            <Form.Input
              label='Other Animals'
              value={newAdopt.otherAnimals}
              name='otherAnimals'
              onChange={handleChange}
              type='checkbox'
            />
            <Form.Input
              label='Small Children'
              value={newAdopt.smallChildren}
              name='smallChildren'
              onChange={handleChange}
              type='checkbox'
            />
          </div>
        </div>
        <div className='button-div'>
          <Button disabled={loading} id='add-event-btn' content='Done' fluid />
        </div>
      </Form>
    </div>
  );
};

export default AdoptAnimalModal;
