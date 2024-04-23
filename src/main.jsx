import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ClassProvider } from './contexts/ClassesContext';
import { AnnouncementProvider } from './contexts//AnnouncementContext'; // Import AnnouncementProvider
import Home from '../src/pages/Home/Home';
import { Layout } from '../src/components/Layout/Layout';
import LoginPage from './pages/authenticationpage/Login/Login';
import SignupPage from './pages/authenticationpage/Signup/Signup';
import { Library } from './pages/Library/Library';
import Feed from './pages/Feed/Feed';
import Opportunities from './pages/CollegeClacementFeed/Opportunities';
import Chat from './pages/Doubt&Poll/Chat';
import ClassRoom from './pages/ClassRoom/ClassRoom';
import Attendence from './pages/Attendence/Attendence';
import RgpvCalender from './pages/RgpvCalender/RgpvCalender';

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
      {
        path: '/Home/Feed',
        element:<Feed/>
      },
      {
        path: '/Home/Opportunities',
        element:<Opportunities/>
      },
      {
        path: '/Home/Doubt&Poll',
        element:<Chat/>
      },
      {
        path: '/Home/ClassRoom/:id',
        element:<ClassRoom/>
      },
      {
        path: '/Home/Attendence',
        element:<Attendence />
      },
      {
        path: '/Home/RgpvCalender',
        element:<RgpvCalender />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <ClassProvider>
        <AnnouncementProvider> {/* Wrap your application with AnnouncementProvider */}
          <RouterProvider router={router} />
        </AnnouncementProvider>
      </ClassProvider>
    </RecoilRoot>
  </React.StrictMode>
);
