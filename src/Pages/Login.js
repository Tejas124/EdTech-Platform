import React from 'react'
import Template from '../Components/Core/Auth/Template';
import loginImg from '../assets/Login-Signup/login.png';

const Login = () => {
  return (
    <Template
        title="Welcome Back"
        desc1="Build Skills for Today, Tomorrow and Beyond"
        desc2="Education to Future-Proof your Career"
        image={loginImg}
        formtype="login" 
        
    />
  )
}

export default Login;