import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './../../../firebase';
import { setUserToken } from '../../../utils/sessionStorage/sessionStorage';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // Import 'doc' from Firestore
import '../CSS/authentication.css';
import campusConnect from '../CSS/logoimages/campusConnect.png';
import collegeLogo from '../CSS/logoimages/collegelogo.png';
import backgroundImg from '../CSS/logoimages/backgroundimg.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);

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
  } else if (name === 'password') {
    // Check password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
    } else {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  } else {
    setErrors({
      ...errors,
      [name]: ''
    });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if the user already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, formData.email);
      
      if (signInMethods.length > 0) {
        // User already exists, display error message
        setErrors({
          ...errors,
          email: 'This email is already registered'
        });
        setLoading(false);
        return;
      }

      // Proceed with creating a new user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Initialize Firestore
      const db = getFirestore();

      // Update Firestore collection
      const userToken = userCredential._tokenResponse.localId;
      await setDoc(doc(db, 'users', userToken), { // Specify the document reference using 'doc'
        name: formData.fullName,
        enrolledclassrooms: []
      });

      // Save user's authentication token to session storage
      setUserToken(userToken);

      // Redirect to Home page
      navigate('/Home');
    } catch (error) {
      console.error('Error signing up with email and password', error);
      setLoading(false);
      // Handle errors, display error messages, etc.
    }
  };

  return (
    <div className="container">
      <img src={campusConnect} alt="campusConnect" className="logo" />
      <img src={backgroundImg} alt="backgroundImg" className="backgroundImg w-96" />
      <div className="form-container">
        <img src={collegeLogo} alt="College Logo" />
        <img src={campusConnect} alt="campusConnect" className="campusConnect" />
        <h2 className="text-center">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName" 
              name="fullName" 
              type="text" 
              autoComplete="name" 
              required 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Full Name" 
              className={`input-field ${errors.fullName ? 'error' : ''}`} 
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
