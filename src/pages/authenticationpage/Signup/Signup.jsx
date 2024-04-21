import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from './../../../firebase';
import { setUserToken } from '../../../utils/sessionStorage/sessionStorage';
import classroomLogo from '../Login/logoimages/classroomlogo.png';
import collegelogo from '../Login/logoimages/collegelogo.png';
import backgroundImg from '../Login/logoimages/backgroundimg.png';

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
      setUserToken(userCredential._tokenResponse.localId);
    
      // Handle successful sign up, redirect user, etc.
      navigate('/Home');
    } catch (error) {
      console.error(error);
      // Handle errors, display error messages, etc.
    }
  };

  return (
    <div className="container">
      <img src={classroomLogo} alt="Classroom Logo" className="logo" />
      <img src={backgroundImg} alt="backgroundimg" className="backgroundimg w-96  max-2xl:relative max-2xl:left-96" />
      <div className="form-container">
        <img src={collegelogo} alt="College Logo" />
        <img src={classroomLogo} alt="Classroom Logo" className="classroomlogo" />
        <h2 className="text-center">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autoComplete="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email address" 
              className={`input-field ${errors.email ? 'error' : ''}`} 
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="new-password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              className={`input-field ${errors.password ? 'error' : ''}`} 
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
         <div className="link">
            <p>Already have an account? <Link to="/" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in here</Link></p>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
