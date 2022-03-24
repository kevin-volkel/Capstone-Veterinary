import React, { useState } from 'react';
import { Form, Segment, Message, Divider, Button } from 'semantic-ui-react';

const RegisterForm = ({ user, handleChange, setIsLogin }) => {
  const { firstName, lastName, email, password, role, classCode } = user;

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setshowPassword] = useState(false);

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
              label="FirstName"
              required
              placeholder="First"
              value={firstName}
              name="firstName"
              onChange={handleChange}
              type="text"
            />
            <Form.Input 
              label="LastName"
              required
              placeholder="Last"
              value={lastName}
              name="lastName"
              onChange={handleChange}
              type="text"
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ marginBottom: '1rem' }} content="Login" />
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
