import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios'
import { UserContext } from "../context/user.context";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)
    
  
    const handleSignup = (e) => {
      e.preventDefault()
      axios.post('/users/register', {
        email,
        password
    }).then((res) => {
        console.log(res.data)

        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)

        navigate('/')
    }).catch((err) => {
        console.log(err.response.data)
    })
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
                className="w-full px-4 py-2 mt-2 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    );
  };

  export default Register;