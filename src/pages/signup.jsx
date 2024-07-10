import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function SignupForm() {
  // State variables to store form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Normal'); // Default to Normal
  const navigate = useNavigate();
  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend API
      console.log({ username, email, password, userType });
      const response = await axios.post('http://localhost:5000/auth/signup', {
        username,
        email,
        password,
        userType,
      });
      console.log(response.data);
      toast.success("Registration Successfull");
      navigate('/login');
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error(error);
    }
   // navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
              </pattern>
            </defs>
            <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
              </pattern>
            </defs>
            <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' />
          </svg>
        </div>
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">I-VOTE</span>
              </a>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to I-Vote!</h4>
            <p className="mb-6 text-gray-500">Please sign-up and form a new account</p>
            <form className="mb-4" onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="username" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Username</label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="username"
                  name="username"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="password"
                    id="password"
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    name="password"
                    placeholder="············"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="userType" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="Root">Root</option>
                </select>
              </div>
              <div className="mb-4">
                <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit" >Sign Up</button>
              </div>
            </form>
            <p className="mb-4 text-center">
              Already have an account?
              <a href="/login" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">Login to account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
