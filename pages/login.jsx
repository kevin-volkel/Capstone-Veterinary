import React, {useState} from 'react'

const login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState({
    
  })


  return <>
    <h1 style={{textAlign: 'center'}}>{isLogin ? 'Login' : 'Register'}</h1>
    {isLogin ? <></> : <></>}
  </>
}

export default login