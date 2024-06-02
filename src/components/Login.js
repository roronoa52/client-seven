import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authorization, setAuthorization] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        const authToken = Cookies.get('authorization');
        if (authToken) {
        navigate("/dashboard")
        } else {
        console.log('Authorization Token not found in cookies.');
        navigate("/login-admin")
        }
    },[authorization]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
          };

        axios.post("https://salon-hewan.vercel.app/api/v1/member/login", loginData)
        .then( (response) => {
            setAuthorization(response.data.data.token)
            Cookies.set('authorization', response.data.data.token)
        })
        .catch(error => {
            console.error('Login error:', error);
          });
    }
    

  return (
    <>
     <section
      id="home"
      className="lg:h-[100vh] lg:mt-0 flex items-center bg-white lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden">
      <div className="container mx-auto h-full">
        <div className="flex items-center h-full">
          <div className="flex-1 flex flex-col items-center lg:items-center">
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="username"
              id="username"
              onChange={handleUsernameChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Login