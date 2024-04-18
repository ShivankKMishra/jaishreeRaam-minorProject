// src\components\Layout\Layout.jsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import JoinClass from '../Forms/JoinClass/JoinClass'; // Import the JoinClass component
import backgroundimg from './backgroundimg.png';
export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false); // State for JoinClass popup

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleJoinClass = () => {
    setIsJoinClassOpen(!isJoinClassOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} toggleJoinClass={toggleJoinClass} /> {/* Pass down toggleJoinClass */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={` transition-all ease-in-out ${isSidebarOpen ? 'pl-72' : 'pl-16'}`}>
         <img src={backgroundimg} alt="backgroundimg" className=" w-auto mr-4" style={{height: '32rem',
  position: 'fixed',
  top: '1/2',
  left: '1/6',
  zIndex:'-1 ' ,
  opacity:'0.2',
  transform: 'rotate(-11deg)',
  borderBottomLeftRadius: '16rem'}} />
        {/* Adjust the styling for the main content area based on sidebar state */}
        <Outlet />
      </div>
      <Footer />
      {/* Render JoinClass popup */}
      <JoinClass isOpen={isJoinClassOpen} onClose={toggleJoinClass} />
    </>
  );
};
