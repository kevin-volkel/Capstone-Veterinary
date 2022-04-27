import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { resetPassword } from './util/email';
import { emailReg } from './util/regi'

const reset = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false)

  const handleSubmit = async () => {
    axios.post('/api/v1/email', {
      email: 'kvolke272@west-mec.org',
      code: '134fd23',
    });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if(emailReg.match(emailReg)) return setValid(true)
    return setValid(false)
  }

  return (
    <div className="form-wrap">
      <Form id="resetPassword" onSubmit={handleSubmit} disabled={!valid}>
        <Segment>
          <h1 className="reset-password">Reset Password</h1>
          <Form.Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
          <Button content="Click to enter password" type="submit" disabled={!valid} color={valid ? 'green' : 'white'}/>
        </Segment>
      </Form>
    </div>
  );
};

export default reset;
