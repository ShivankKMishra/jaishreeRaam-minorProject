// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`ml-64 transition-all ease-in-out ${isSidebarOpen ? 'pl-72' : 'pl-16'}`}>
        {/* Adjust the styling for the main content area based on sidebar state */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
