// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home/Home';
import { Layout } from '../src/components/Layout/Layout';
import LoginPage from './pages/authenticationpage/Login/Login';
import SignupPage from './pages/authenticationpage/Signup/Signup';

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
