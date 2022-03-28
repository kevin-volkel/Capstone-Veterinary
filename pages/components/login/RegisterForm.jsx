import React, { useState, useRef } from 'react';
import {
  Form,
  Segment,
  Message,
  Divider,
  Button,
  Image,
  Header,
  Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import { setToken } from '../../util/auth'
import { classCodes } from '../../util/classCodes'

const defaultProfilePic =
  'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

const RegisterForm = ({ user, handleChange, setIsLogin, width, mediaPreview, media }) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    classCode,
    teacherCode,
  } = user;

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  const roleOptions = [
    {
      text: 'Student',
      value: 'student',
      key: 0,
    },
    {
      text: 'Teacher',
      value: 'teacher',
      key: 1,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true)

    let profilePicURL;

    if(media !== null) {
      const formData = new FormData();
      formData.append('image', media, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      const res = await axios.post('/api/v1/upload', formData)
      profilePicURL = res.data.src;
    }

    if(media !== null && !profilePicURL) {
      setFormLoading(false)
      return res.status(500).send('Image upload error')
    }

    if(media === null) {
      profilePicURL = defaultProfilePic;
    }

    try {
      const submittedClass = classCodes[classCode]
      if(!submittedClass) return res.status(401).send('Invalid Class Code')

      const res = await axios.post('/api/v1/user/signup', {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
        class: submittedClass,
        profilePicURL
      })

      setToken(res.data.token)
    } catch (err) {
      console.log(err)
    }

    setFormLoading(false)
  };

  return (
    <>
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        style={{ margin: '0 auto', width: width }}
        onSubmit={handleSubmit}
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
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <h1> Register </h1>

            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '35px',
                position: 'absolute',
                right: '15px',
                top: '10px'
              }}
            >
              <Image 
                src={(mediaPreview === null) ? defaultProfilePic : mediaPreview} 
                style={{ borderRadius: '50%', height: '70px', width: '70px' }}
              />

              <div className="edit">
                <input
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  name="media"
                  ref={inputRef}
                />
                <Button
                  onClick={(e) => inputRef.current.click()}
                  style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    padding: '0',
                    margin: '0',
                    position: 'relative',
                    bottom: '20px',
                    left: '45px'
                  }}
                  // content={<Icon name="edit outline" />}
                  icon="pencil"
                  color="blue"
                />
              </div>
            </div>
          </div>
          <Form.Input
            label="Email"
            required
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
            icon="envelope"
            iconPosition="left"
            type="email"
          />
          <Form.Input
            label="Password"
            required
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
            icon={{
              name: showPassword ? 'eye slash' : 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? 'text' : 'password'}
          />
          <Divider hidden />
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              required
              placeholder="First"
              value={firstName}
              name="firstName"
              onChange={handleChange}
              type="text"
            />
            <Form.Input
              label="Last Name"
              required
              placeholder="Last"
              value={lastName}
              name="lastName"
              onChange={handleChange}
              type="text"
            />
          </Form.Group>
          <Divider hidden />
          <Form.Group widths="equal">
            <Form.Select
              options={roleOptions}
              value={role}
              onChange={handleChange}
              name="role"
              label="Student or Teacher?"
            />
            {role == 'teacher' ? (
              <Form.Input
                type="text"
                label="Teacher Code"
                name="teacherCode"
                value={teacherCode}
                onChange={handleChange}
                placeholder="12345678"
              />
            ) : (
              <Form.Input
                type="text"
                label="Class Code"
                name="classCode"
                value={classCode}
                onChange={(e) => {
                  if (e.target.value.length > 6) return;
                  handleChange(e);
                }}
                placeholder="123456"
              />
            )}
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{
                marginBottom: '1rem',
                padding: '10px',
                fontSize: '1.4rem',
              }}
              content="Register"
              color="yellow"
              fluid
            />
          </div>
          <h5
            style={{
              textAlign: 'center',
              width: '50vw',
              margin: '0 auto',
              cursor: 'pointer',
            }}
            onClick={() => setIsLogin(true)}
          >
            Already have an account?
          </h5>
        </Segment>
      </Form>
    </>
  );
};

export default RegisterForm;
