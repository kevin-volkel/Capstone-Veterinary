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

  const handleChange = (e, data) => {
    const { name, value } = e.target;

    if(!name) {
      setUser((prev) => ({
        ...prev,
        'role': data.value
      }))
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const width = '80vw'

  return (
    <>
      {isLogin ? (
        <LoginForm
          user={user}
          handleChange={handleChange}
          setIsLogin={setIsLogin}
          width={width}
        />
      ) : (
        <RegisterForm
          user={user}
          handleChange={handleChange}
          setIsLogin={setIsLogin}
          width={width}
        />
      )}
    </>
  );
};

export default login;
