import React, { useState } from 'react';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';

const login = ({}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    classCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin ? (
        <LoginForm
          user={user}
          handleChange={handleChange}
          setIsLogin={setIsLogin}
        />
      ) : (
        <RegisterForm
          user={user}
          handleChange={handleChange}
          setIsLogin={setIsLogin}
        />
      )}
    </>
  );
};

export default login;
