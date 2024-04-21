import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import JoinClass from '../Forms/JoinClass/JoinClass';
import backgroundimg from './backgroundimg.png';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleJoinClass = () => {
  console.log('Before setIsSidebarOpen:', isSidebarOpen);
  // Close the sidebar only if it's currently open
  if (isSidebarOpen) {
    setIsSidebarOpen(!isSidebarOpen);
  }
  console.log('After setIsSidebarOpen:', isSidebarOpen);
  // Toggle the JoinClass component
  setIsJoinClassOpen(!isJoinClassOpen);
};


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
