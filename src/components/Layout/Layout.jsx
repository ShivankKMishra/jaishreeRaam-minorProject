import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import JoinClass from '../Forms/JoinClass/JoinClass'; // Import the JoinClass component

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <div className={`ml-64 transition-all ease-in-out ${isSidebarOpen ? 'pl-72' : 'pl-16'}`}>
        {/* Adjust the styling for the main content area based on sidebar state */}
        <Outlet />
      </div>
      <Footer />
      {/* Render JoinClass popup */}
      <JoinClass isOpen={isJoinClassOpen} onClose={toggleJoinClass} />
    </>
  );
};
