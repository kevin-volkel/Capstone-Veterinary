import React, { useState } from 'react';
import { Form, Segment, Message, Divider, Button } from 'semantic-ui-react';

const RegisterForm = ({ user, handleChange, setIsLogin, width }) => {
  const { firstName, lastName, email, password, role, classCode } = user;
  const [teacherCode, setTeacherCode] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setshowPassword] = useState(false);

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

  const handleSubmit = () => {};

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
          <h1> Register </h1>
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
          <Divider hidden/>
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
          <Divider hidden/>
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
                  setTeacherCode(e.target.value);
                }}
                placeholder="12345678"
              />
            ) : <Form.Input 
                type="text"
                label="Class Code"
                name='classCode'
                value={classCode}
                onChange={ (e) => {
                  if (e.target.value.length > 6) return;
                  handleChange(e)
                }}
                placeholder="123456"
            />}
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
