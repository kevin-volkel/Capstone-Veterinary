import React, { useState } from 'react';
import { Form, Segment, Message, Divider, Button } from 'semantic-ui-react';
import { setToken } from '../../util/auth'
import axios from 'axios'

const LoginForm = ({ user, handleChange, setIsLogin, width }) => {
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true)

    try{
      const res = await axios.post('/api/v1/user/login', {email, password})
      setToken(res.data.token)
    } catch (err) {
      console.log(err)
      setErrorMsg(err.message)
    }

    setFormLoading(false)
  };

  return (
    <>
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        style={{ margin: '0 auto', width }}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <h1> Login </h1>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{
                marginBottom: '1rem',
                padding: '10px',
                fontSize: '1.4rem',
                color: 'white',
                background: '#F7931D'
              }}
              content="Log In"
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
            onClick={() => setIsLogin(false)}
          >
            Need to make an account?
          </h5>
        </Segment>
      </Form>
    </>
  );
};

export default LoginForm;
