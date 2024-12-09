import React, { useState } from 'react';
import Stars from '../../components/Stars';
import { FaLock, FaMailBulk } from 'react-icons/fa';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(process.env.REACT_APP_API_URL + '/login' , {
            password
            ,email
        })
        navigate('/participants')

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="relative w-full h-dvh bg-gradient-to-b from-black via-black/90 via-[70%] to-purple-900/40 to-[100%] flex items-center justify-center">
      <Stars />
      <div className="relative border-gray-500 border-solid border w-full max-w-md p-8 bg-[#0000001b] z-40 rounded-xl shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center text-white">
              <input 
                type="checkbox" 
                className="mr-2 bg-white/10 border-white/20 rounded text-purple-500 focus:ring-purple-500"
              />
              Remember me
            </label>
            <a href="#" className="text-purple-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-6 text-white">
          Don't have an account? 
          <a href="#" className="ml-2 text-purple-400 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
