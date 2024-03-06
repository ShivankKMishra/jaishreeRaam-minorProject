// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import { Layout } from '../src/components/Layout/Layout';
import LoginPage from './pages/authenticationpage/Login/Login';
import SignupPage from './pages/authenticationpage/Signup/Signup';
import { Library } from './pages/Library/Library';

const router = createBrowserRouter([
  {
    path: '/',
    element:<LoginPage/>
  },
  {
    path: '/SignupPage',
    element:<SignupPage/>
  },
  {
    path: '/Home',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
       {
    path: '/Home/Library',
    element:<Library/>
  },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot> {/* Ensure RecoilRoot wraps your entire application */}
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
