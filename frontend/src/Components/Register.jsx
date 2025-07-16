import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    username: '',
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/register', formData);
      console.log(response.data);

      setFormError(''); 
      setSuccess(true); 
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(error);
      setFormError("Error Signing Up");
      setSuccess(false);
    }
  };

  const closePopup = () => {
    setSuccess(false); // Hide success message (pop-up)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-cover" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_%281660s%29_after_restoration_%28802_%C3%97_923%29.jpg/800px-Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_%281660s%29_after_restoration_%28802_%C3%97_923%29.jpg")' }}></div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
           <div className="flex justify-center items-center mb-6">
           <a href='/' className="flex items-start py-4 px-2">
            <img src="./Icon.svg" alt="Logo" className="h-10 w-auto" />
            <img src="./Magnum Opus.svg" alt="Tagline" className="h-8 w-auto ml-4" />
           </a>
            </div>
            <h2 className="font-body text-2xl font-bold mt-10 tracking-tighter">Registration</h2> 
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body" htmlFor="FullName">
                FullName
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                className="shadow appearance-none border rounded-md font-body w-full py-2 px-3 text-gray-400  font-extralight tracking-tight leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Enter your FullName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="shadow appearance-none border rounded-md font-body w-full py-2 px-3 text-gray-400  font-extralight tracking-tight leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Enter Valid Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                className="shadow appearance-none border rounded-md font-body w-full py-2 px-3 text-gray-400  font-extralight tracking-tight leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Enter your Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-body font-normal ml-1 mb-2" htmlFor="password">
                Password
              </label>
            <div className='relative'>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
               {/* <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? (
                    <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.196 0 2.34.262 3.375.725M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  )}
                </button> */}
            </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-body font-normal ml-1 mb-2" htmlFor="password">
                Confirm Password
              </label>
            <div className='relative'>
              <input
                type= "password"
                id="password"
                name="password"
                value={formData.password}
                className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Re-enter your password"
                onChange={handleChange}
                required
              />
               {/* <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? (
                    <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.196 0 2.34.262 3.375.725M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-700" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l3.31 3.31m1.39-4.69l-.07.07A8.004 8.004 0 0112 20.9a8.004 8.004 0 01-8-8.9c0-.91.15-1.77.42-2.56l.08-.18m1.9 3.69L9 9m3-2a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  )}
                </button> */}
            </div>
            </div>
            {/* <div>
            <Checkbox
              label='I Agree to the terms and conditions'
              containerProps={{
               className: "-mt-5",
              }}></Checkbox>
               
            </div> */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="bg-black font-body  text-white font-bold mt-2 py-2 px-4 border-2 border-black rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 hover:bg-transparent hover:text-black"
              >
                Sign-In
              </button>
            </div>
            {/* <div className="text-center">
              <a
                href="/sign_in"
                className="inline-block align-baseline font-thin text-sm text-black transition-colors duration-150 hover:text-gray-600"
              >
                Dont have an account? Sign In Now!
              </a>
            </div> */}
          </form>
        </div>
      </div>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Registration Successful</h3>
            <p>Your account has been created successfully!</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
