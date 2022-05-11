import React, { useState } from 'react';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import catchErrors from '../../util/catchErrors';

const AdoptAnimalModal = ({ animalObj, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [newAdopt, setNewAdopt] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    haveOtherAnimals: false,
    otherAnimals: '',
    haveSmallChildren: false,
    smallChildren: '',
    aboutYou: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'haveOtherAnimals' || name === 'haveSmallChildren') {
      setNewAdopt((prev) => ({
        ...prev,
        [name]: checked,
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
      const res = await axios.post('/api/v1/email/adopt', {
        animalObj: animalObj,
        formData: newAdopt,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      let caughtErr = catchErrors(err);
      setErrorMsg(caughtErr);
    }
    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className='form-wrap' id='adopt-modal'>
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
            aria-label='Full Name Entry Box'
          />
          <Form.Input
            label='Phone Number'
            required
            placeholder='000-000-0000'
            value={newAdopt.phoneNumber}
            name='phoneNumber'
            onChange={handleChange}
            type='text'
            aria-label='Phone number entry box'
          />
          <Form.Input
            label='Email'
            required
            value={newAdopt.email}
            name='email'
            onChange={handleChange}
            type='email'
            placeholder='Email'
            aria-label='email entry box'
          />
          <Form.TextArea
            label='About You'
            placeholder='Tell us about you!'
            value={newAdopt.aboutYou}
            name='aboutYou'
            onChange={handleChange}
            type='text'
            aria-label='about you entry box'
          />
          <div className='checkboxes'>
            <div className='checkbox-combo'>
              <Form.Input
                label='Other Animals'
                value={newAdopt.haveOtherAnimals}
                name='haveOtherAnimals'
                onChange={handleChange}
                type='checkbox'
                aria-label='check box for if you have other animals'
              />
              <Form.Input
                label='Small Children'
                value={newAdopt.haveSmallChildren}
                name='haveSmallChildren'
                onChange={handleChange}
                type='checkbox'
                aria-label='check box for if you have small children'
              />
            </div>
          </div>
          <div className='checkbox-inputs'>
            {newAdopt.haveOtherAnimals && (
              <Form.Input
                label='What types of animals do you have? (separate with a comma)'
                checked={newAdopt.otherAnimals}
                name='otherAnimals'
                onChange={handleChange}
                type='text'
                placeholder='Ex: Dog, Cat, Bird, etc.'
                required
                aria-label='What other animals do you have'
              />
            )}
            {newAdopt.haveSmallChildren && (
              <Form.Input
                label='What are the ages of these children? (separate with a comma)'
                checked={newAdopt.smallChildren}
                name='smallChildren'
                onChange={handleChange}
                type='text'
                placeholder='Ex: 4, 6, 7, 8'
                required
                aria-label='what are the ages of the children'
              />
            )}
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
