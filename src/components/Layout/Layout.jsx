import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import JoinClass from '../Forms/JoinClass/JoinClass';
import backgroundimg from './backgroundimg.png';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle the JoinClass component
  const toggleJoinClass = () => {
    setIsJoinClassOpen(!isJoinClassOpen);
  };

  // Close the sidebar initially for smaller displays
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width according to your preference
    setIsSidebarOpen(!mediaQuery.matches); // Close the sidebar if the screen width is less than or equal to 768px
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} toggleJoinClass={toggleJoinClass} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-all ease-in-out ${isSidebarOpen ? 'pl-72' : 'pl-16'}`}>
        <img src={backgroundimg} alt="backgroundimg" className="w-auto mr-4" style={{ height: '32rem', position: 'fixed', top: '1/2', left: '1/6', zIndex: '-1', opacity: '0.2', transform: 'rotate(-11deg)', borderBottomLeftRadius: '16rem' }} />
        <Outlet />
      </div>
      <Footer />
      <JoinClass isOpen={isJoinClassOpen} onClose={toggleJoinClass} />
    </>
  );
};
