import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from './../../../firebase'; // Import Firebase configuration and signInWithGoogle function
// Your other imports...

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleLoginClicked, setGoogleLoginClicked] = useState(false); // State to track Google login button click
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoginClicked(true); // Set Google login button clicked
      await signInWithGoogle(); // Sign in with Google
      navigate('/Home'); // Redirect to home page after successful Google authentication
    } catch (error) {
      console.error('Error signing in with Google', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic email format validation
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      await signInWithEmailAndPassword(auth, email, password);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={handleEmailChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${googleLoginClicked ? 'opacity-50 pointer-events-none' : ''}`} placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={handlePasswordChange} className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${googleLoginClicked ? 'opacity-50 pointer-events-none' : ''}`} placeholder="Password" />
            </div>
          </div>
          {/* Display error message if there is one */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/SignupPage" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign up
              </Link>
            </div>
            <div>
              <button type="submit" className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${googleLoginClicked ? 'opacity-50 pointer-events-none' : ''}`} disabled={loading || googleLoginClicked}>
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
          <div>
            <button type="button" onClick={handleGoogleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
