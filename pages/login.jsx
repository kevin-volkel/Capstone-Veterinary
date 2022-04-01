import React, { useState, useEffect } from 'react';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';

const login = ({}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    classCode: '',
    teacherCode: '',
    profilePicURL: '',
  }); 

  

  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);

  const handleChange = (e, data) => {
    const { name, value, files } = e.target;

    if (!name) {
      setUser((prev) => ({
        ...prev,
        role: data.value,
      }));
    } else if (name == 'media' && files.length) {
      setMedia(() => files[0]);
      setMediaPreview(() => URL.createObjectURL(files[0]));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const width = '80vw';

  return (
    <>
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
          media={media}
          mediaPreview={mediaPreview}
        />
      )}
    </>
  );
};

export default login;
