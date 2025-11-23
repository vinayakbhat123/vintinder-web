import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom" 
import { useDispatch } from 'react-redux'; 
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
const Login = () => {
  // State to manage the form inputs
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
   const [lastName,setlastName] = useState("");
  const [error,setError] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(
        BASE_URL + "/login",
        {emailId,password},
        { withCredentials: true});
       dispatch(addUser(res.data))
       navigate("/feed")
    } catch (error) {
      if(status === 400) {
        console.error("Error",error.status)
      }
       if (error?.response) {
        // Backend validation or business logic failure
        setError(error.response.data || error.response.data?.message || "A server-side issue occurred.");
      } else if (error.request) {
        // Server didn't respond
        setError("Network bottleneck detected. Server is unreachable.");
      } else {
        // Client-side error
        setError("Client-side execution fault during signup.");
      }
      
    }
   
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      dispatch(addUser(res?.data?.data))
      navigate("/profile")
    } catch (error) {
       if (error.response) {
        // Backend validation or business logic failure
        setError(error.response.data ||error.response.data?.message || "A server-side issue occurred.");
      } else if (error.request) {
        // Server didn't respond
        setError("Network bottleneck detected. Server is unreachable.");
      } else {
        // Client-side error
        setError("Client-side execution fault during signup.");
      }
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-base-200 pt-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-base-300 rounded-xl shadow-2xl">
        
        {/* Header Section */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
           {isLoginForm ? "Login" : "Sign Up" }
          </h2>
        </div>
        
        {/* Form */}
        <form className="mt-8 space-y-6 " onSubmit={isLoginForm ? handleSubmit : handleSignUp}>
          <div className="rounded-md shadow-sm -space-y-px">
          {!isLoginForm && <>  <div>
              <label htmlFor="firstName" className="sr-only">
                FirstName
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
              <div>
              <label htmlFor="lastName" className="sr-only">
                LastName
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="LastName"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            </> }

            {/* Email Input */}
            <div>
              <label htmlFor="emailId" className="sr-only">
                Email address
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {/* Remember Me / Forgot Password */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberme"
                name="rememberme"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberme" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div> */}

          {/* Submit Button */}
          <div>
              <p className='text-red-500 pb-5'>{error}</p>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon lock */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
             {isLoginForm ? "Login" :"Sign Up" }
            </button>
            <p onClick={() => setIsLoginForm(value => !value)}
            className='text-white pb-5 font-bold flex justify-center cursor-pointer'>{isLoginForm ? "New User? Sign Up Here" : "Already have an account? Login"}</p>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Login;