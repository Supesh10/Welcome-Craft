// import React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../features/auth/authSlice';
// import { useDispatch } from 'react-redux';
// import {  toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [loginForm, setLoginForm] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false); // Add loading state
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleLoginFormChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm({
//       ...loginForm,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     const errors = {};
//     if (!loginForm.username) errors.username = "Email is required";
//     if (!loginForm.password) errors.password = "Password is required";
//     return errors;
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         setLoading(true);
//         const response = await axios.post(
//           "http://localhost:8081/api/user/login",
//           loginForm
//         );

//         const { token, user } = response.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("userRole", user.role);
//         dispatch(login({ token, role: user.role }));

//         toast.success("Login successful");
//         setLoading(false);
//         navigate('/');
//       } catch (error) {
//         console.error(error.response.data.msg);
//         toast.error(error.response.data.msg);
//         setLoading(false);
//       }
//     }
//   };

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="w-1/2 bg-cover" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/507px-Mona_Lisa.jpg")' }}></div>
//         <div className="w-1/2 p-8 flex flex-col justify-center">
//           <div className="text-center mb-8">
//             <div className="flex justify-center items-center mb-6">
//               <a href='/' className="flex items-start py-4 px-2">
//                 <img src="./Icon.svg" alt="Logo" className="h-10 w-auto" />
//                 <img src="./Magnum Opus.svg" alt="Tagline" className="h-8 w-auto ml-4" />
//               </a>
//             </div>
//             <h2 className="font-body text-3xl font-bold mt-10 tracking-tighter">Login</h2>
//           </div>
//           <form onSubmit={handleLoginSubmit}>
//             <div className="mb-6">
//               <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body" htmlFor="username">
//                 Username
//               </label>
//               <input
//                 type="username"
//                 id="username"
//                 name="username"
//                 value={loginForm.username}
//                 className="shadow appearance-none border rounded-md font-body w-full py-2 px-3 text-gray-400 font-extralight tracking-tight leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
//                 placeholder="Enter your Username"
//                 onChange={handleLoginFormChange}
//                 required
//               />
//               {errors.username && <p className="font-body text-red-500 text-sm mt-1">{errors.username}</p>}
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-500 text-sm font-body font-normal ml-1 mb-2" htmlFor="password">
//                 Password
//               </label>
//               <div className='relative'>
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   id="password"
//                   value={loginForm.password}
//                   className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
//                   placeholder="Enter your password"
//                   onChange={handleLoginFormChange}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                 >
//                   {passwordVisible ? (
//                     <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.196 0 2.34.262 3.375.725M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
//                     </svg>
//                   ) : (
//                     <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//             <div className="text-red-500 text-sm">{errors.password}</div>
//           )}
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <button
//                 type="submit"
//                 className="bg-black font-body text-white font-bold mt-2 py-2 px-4 border-2 border-black rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 hover:bg-transparent hover:text-black"
//               >
//                 Login
//               </button>
//             </div>
//             <div className="text-center">
//               <a
//                 href="/signin"
//                 className="inline-block align-baseline font-thin text-sm text-black transition-colors duration-150 hover:text-gray-600"
//               >
//                 Dont have an account? Sign In Now!
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
//             <div className="border-t-4 border-b-4 border-gray-800 rounded-full w-12 h-12 animate-spin"></div>
//             <span className="ml-4 text-gray-700 font-body font-light text-lg">Loading...</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginForm.username) errors.username = 'Username is required';
    if (!loginForm.password) errors.password = 'Password is required';
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8081/api/user/login', loginForm);
        
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        dispatch(login({ token, role: user.role }));

        toast.success('Login successful');
        setLoading(false);
        navigate('/');
      } catch (error) {
        setLoading(false);
        
        // Log the full error object to understand its structure
        console.error('Error:', error);

        if (error.response) {
          const errorMsg = error.response.data.msg || 'Invalid credentials';
          toast.error(errorMsg);
          setErrors({ form: errorMsg });
        } else if (error.request) {
          toast.error('No response from server. Please try again later.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="w-1/2 bg-cover"
          style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/507px-Mona_Lisa.jpg")' }}
        ></div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <a href="/" className="flex items-start py-4 px-2">
                <img src="./Icon.svg" alt="Logo" className="h-10 w-auto" />
                <img src="./Magnum Opus.svg" alt="Tagline" className="h-8 w-auto ml-4" />
              </a>
            </div>
            <h2 className="font-body text-3xl font-bold mt-10 tracking-tighter">Login</h2>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginForm.username}
                className="shadow appearance-none border rounded-md font-body w-full py-2 px-3 text-gray-400 font-extralight tracking-tight leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Enter your Username"
                onChange={handleLoginFormChange}
                required
              />
              {errors.username && <p className="font-body text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-body font-normal ml-1 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={loginForm.password}
                  className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                  placeholder="Enter your password"
                  onChange={handleLoginFormChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? (
                    <svg
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.196 0 2.34.262 3.375.725M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="font-body text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {errors.form && <p className="font-body text-red-500 text-sm mb-6">{errors.form}</p>}
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="bg-black font-body text-white font-bold mt-2 py-2 px-4 border-2 border-black rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 hover:bg-transparent hover:text-black"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <a
                href="/signin"
                className="font-body text-gray-400 font-normal text-xs hover:text-gray-500 transition duration-200"
              >
                Don't have an account? Sign Up here
              </a>
            </div>
            {/* <div className="text-center mt-4">
              <a
                href="/forgot-password"
                className="font-body text-gray-400 font-normal text-xs hover:text-gray-500 transition duration-200"
              >
                Forgot password?
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
