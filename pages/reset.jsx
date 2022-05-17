import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import catchErrors from './util/catchErrors';
import { emailReg } from './util/regi';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [step, setStep] = useState(1);
  const [codeInput, setCodeInput] = useState(12345);
  const [trueCode, setTrueCode] = useState(null);
  const [wrongCounter, setWrongCounter] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const code = Math.floor(Math.random() * 89999) + 10000;
      await axios.post('/api/v1/email', {
        email: email,
        code: code,
      });
      setTrueCode(code);
      setStep(2);
    } catch (err) {
      console.log(err);
      const caughtError = catchErrors(err);
      setErrorMsg(caughtError);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    if (+codeInput !== trueCode) {
      setWrongCounter((prev) => prev + 1);
      setErrorMsg('Wrong Code');
      return false;
    }

    if (wrongCounter >= 3) {
      setStep(1);
      setErrorMsg('Too many attempts. Try again later');
      setEmail('');
      setCodeInput(12345);
      return false;
    }

    setStep(3);
    return true;
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        return false;
      }

      const res = await axios.patch('/api/v1/user', {
        email,
        newPassword,
      });

      router.push('/login');
    } catch (err) {
      console.log(err);
      const caughtError = catchErrors(err);
      setErrorMsg(caughtError);
    }
  };

  useEffect(() => {
    if (errorMsg !== null) {
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }, [errorMsg]);

  return (
    <div className='form-wrap'>
      <Form
        id='resetPassword'
        onSubmit={
          step === 1
            ? handleSubmit
            : step === 2
            ? handleCodeSubmit
            : changePassword
        }
        error={errorMsg !== null}
      >
        <Message
          error
          content={errorMsg}
          header='Oops!'
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <h1 className='reset-password'>Reset Password</h1>
          {step === 1 ? (
            <>
              <Form.Input
                tabIndex='4'
                type='email'
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                tabIndex='5'
                content='Reset password'
                type='submit'
                className='reset-btn'
              />
            </>
          ) : step === 2 ? (
            <>
              <Form.Input
                type='number'
                value={codeInput}
                placeholder='12345'
                onChange={(e) => setCodeInput(e.target.value)}
                min='10000'
                max='99999'
              />
              <Button
                content='Click to reset password'
                type='submit'
                className='reset-btn'
              />
              <div className='back-to-email' onClick={() => setStep(1)}>
                Email not recieved?
              </div>
            </>
          ) : (
            <>
              <Form.Input
                label='New Password'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Form.Input
                label='Confirm New Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                content='Confirm Password'
                type='submit'
                className='reset-btn'
              />
            </>
          )}
        </Segment>
      </Form>
    </div>
  );
};

export default Reset;
