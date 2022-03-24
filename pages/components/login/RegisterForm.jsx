import React, { useState } from 'react';
import { Form, Segment, Message, Divider, Button } from 'semantic-ui-react';

const RegisterForm = ({ user, handleChange, setIsLogin }) => {
  const { firstName, lastName, email, password, role, classCode } = user;

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setshowPassword] = useState(false);

  const roleOptions = [
    {
      text: 'Student',
      value: 'student',
      key: 0
    },
    {
      text: 'Teacher',
      value: 'teacher',
      key: 1
    },
  ]

  const handleSubmit = () => {};

  return (
    <>
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        style={{ margin: '0 auto', width: '90vw' }}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
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
          <Divider />
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
          <Form.Group widths="equal">
            <Form.Select 
              options={roleOptions}
              value={role}
              onChange={handleChange}
              name='role'
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ marginBottom: '1rem' }} content="Register" />
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
