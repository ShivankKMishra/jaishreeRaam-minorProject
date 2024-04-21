import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebase'; // Import Firebase configuration
import { setUserToken } from '../../../utils/sessionStorage/sessionStorage'; // Import setUserToken function
import '../CSS/authentication.css';
import classroomLogo from '../CSS/logoimages/classroomlogo.png';
import collegeLogo from '../CSS/logoimages/collegelogo.png';
import backgroundImg from '../CSS/logoimages/backgroundimg.png';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic email format validation
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Save user's authentication token to localStorage
      setUserToken(userCredential._tokenResponse.localId);

      // Redirect to Home page
      navigate('/Home');
    } catch (error) {
      console.error('Error signing in with email and password', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email format validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="container">
      <img src={classroomLogo} alt="Classroom Logo" className="logo" />
      <img src={backgroundImg} alt="backgroundImg" className="backgroundImg  w-96  " />
      <div className="form-container">
    
        <img src={collegeLogo} alt="College Logo" />
        <img src={classroomLogo} alt="Classroom Logo" className="classroomlogo" />
        
        <h2 className="text-center">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={handleEmailChange} placeholder="Email address" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={handlePasswordChange} placeholder="Password" />
          </div>
          {/* Display error message if there is one */}
          {error && <p className="error-message">{error}</p>}
          <div className="link">
              <p>Don't have an account?<Link to="/SignupPage" className="text-indigo-600 hover:text-indigo-500 font-medium">
             Sign up</Link></p>
            
          </div>
          <div className="text-center">
            <button 
  type="submit" 
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  disabled={loading}
>
  {loading ? 'Signing in...' : 'Sign in'}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
