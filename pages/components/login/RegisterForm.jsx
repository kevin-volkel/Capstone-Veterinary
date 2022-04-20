import React, { useState } from 'react';
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
import { setToken } from '../../util/auth';
import { classCodes, teacherCodes } from '../../util/classCodes';
import catchErrors from '../../util/catchErrors';
import PhotoUpload from '../layout/PhotoUpload';
// import { passwordReg, emailReg } from '../../util/regi';
// import isEmail from 'validator/lib/isEmail';

const RegisterForm = ({
  user,
  handleChange,
  setIsLogin,
  mediaPreview,
  media,
}) => {
  const { firstName, lastName, email, password, role, classCode, teacherCode } =
    user;

  const defaultProfilePic =
    'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    setFormLoading(true);

    let profilePicURL;

    try {
      if (media !== null) {
        const formData = new FormData();
        formData.append('image', media, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const res = await axios.post('/api/v1/upload', formData);
        profilePicURL = res.data.src;
      } else {
        profilePicURL = defaultProfilePic;
      }

      if (media !== null && !profilePicURL) throw new Error('Cloudinary Error');

      let submittedClass = null;
      if (role === 'teacher') {
        submittedClass = teacherCodes[teacherCode];
      } else {
        submittedClass = classCodes[classCode];
      }

      if (!submittedClass) throw new Error('Invalid class code');

      const res = await axios.post('/api/v1/user/signup', {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email,
        password,
        role,
        class: submittedClass,
        profilePicURL,
      });

      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      let caughtErr = catchErrors(err);
      setErrorMsg(caughtErr);
    }

    setFormLoading(false);
  };

  return (
    <div className="form-wrap">
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
        id="register"
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
            // style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <h1> Register </h1>

            <PhotoUpload
              mediaPreview={mediaPreview}
              defaultProfilePic={defaultProfilePic}
              handleChange={handleChange} 
            />
          </div>
          <div id="form-group">
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
              // width={window.innerWidth > 1024 ? 8 : 16}
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
          </div>
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
                onChange={(e) => {
                  if (e.target.value.length > 8) return;
                  handleChange(e);
                }}
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
            <Button id="register-btn" content="Register" fluid />
          </div>
          <h5 className="form-link" onClick={() => setIsLogin(true)}>
            Already have an account?
          </h5>
        </Segment>
      </Form>
    </div>
  );
};

export default RegisterForm;
