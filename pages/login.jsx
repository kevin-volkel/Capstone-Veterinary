import React, {useState} from 'react'
import LoginForm from './components/login/LoginForm'

const login = ({}) => {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    classCode: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser( (prev) => ({
      ...prev,
      [name]: value
    }))
  }


  return <>
    <h1 style={{textAlign: 'center'}}>{isLogin ? 'Login' : 'Register'}</h1>
    {isLogin ? <LoginForm user={user} handleChange={handleChange}/> : <></>}
  </>
}

export default login