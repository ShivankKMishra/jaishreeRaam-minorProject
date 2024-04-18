import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from './../../../firebase';
import classroomLogo from '../Login/logoimages/classroomlogo.png'; // Import your image file
import collegelogo from '../Login/logoimages/collegelogo.png';
import backgroundimg from '../Login/logoimages/backgroundimg.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (value.trim() === '') {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      });
    } else {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, formData.email);
      
      if (signInMethods.length > 0) {
        // User already exists, display error message
        setErrors({
          ...errors,
          email: 'This email is already registered'
        });
        return; // Exit function
      }

      // Proceed with creating a new user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(userCredential);
      // Handle successful sign up, redirect user, etc.
      navigate('/Home');
    } catch (error) {
      console.error(error);
      // Handle errors, display error messages, etc.
    }
  };

  return (
    <div className="h-screen border border-y-4" style={{ backgroundColor: '#afd8d9' }}>
      <img src={collegelogo} alt="college Logo" className="h-28 w-auto mr-4" />
      <img src={backgroundimg} alt="backgroundimg" className="w-auto mr-4" style={{ height: '32rem', position: 'absolute', top: '12rem', left: '14rem', zIndex: '3', transform: 'rotate(-11deg)', borderBottomLeftRadius: '16rem' }} />
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-3/5 h-screen p-8 bg-white rounded-l-lg shadow-lg" style={{ borderTopLeftRadius: '5rem', borderBottomLeftRadius: '5rem' }}>
        <div className="container flex items-center rounded-lg" >
          <img src={classroomLogo} alt="Classroom Logo" className="h-28 w-auto mr-4" /> {/* Adjust height as needed */}
        </div>
        <div className="max-w-md w-full mx-40 my-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
          <form className="w-full my-11" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Email address" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Password" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <p className="text-gray-600">Already have an account? <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
