import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebase'; // Import Firebase configuration
import classroomLogo from './logoimages/classroomlogo.png'; // Import your image file
import collegelogo from './logoimages/collegelogo.png';
import backgroundimg from './logoimages/backgroundimg.png';
import { setUserToken } from '../../../utils/sessionStorage/sessionStorage'; // Import setUserToken function

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

// Log the user token for testing
      // console.log('User token:',  userCredential._tokenResponse.localId);
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
    <div>
      <div className=' h-screen  border border-y-4' style={{ backgroundColor: '#afd8d9' }}>
        <img src={collegelogo} alt="college Logo" className="h-28 w-auto mr-4" />
        <img src={backgroundimg} alt="backgroundimg" className=" w-auto mr-4" style={{ height: '32rem', position: 'absolute', top: '12rem', left: '14rem', zIndex: '3', transform: 'rotate(-11deg)', borderBottomLeftRadius: '16rem' }} />

        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-3/5 h-screen p-8 bg-white rounded-l-lg shadow-lg" style={{ borderTopLeftRadius: '5rem', borderBottomLeftRadius: '5rem' }}>
          <div className="container flex items-center rounded-lg" >
            <img src={classroomLogo} alt="Classroom Logo" className="h-28 w-auto mr-4" />
          </div>
          <div className="max-w-md w-full  mx-40 my-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <form className="w-full my-11" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={handleEmailChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={handlePasswordChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Password" />
                </div>
              </div>
              {/* Display error message if there is one */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <Link to="/SignupPage" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Don't have an account? Sign up
                  </Link>
                </div>
                <div>
                  <button type="submit" className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} disabled={loading}>
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V4a8 8 0 01-8 8zM4 12a8 8 0 018 8v1.5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V20a8 8 0 01-8-8z"></path>
                      </svg>
                    ) : null}
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
