// AnnouncementContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
const AnnouncementContext = createContext();

// Custom hook to use the context
export const useAnnouncementContext = () => useContext(AnnouncementContext);

// Context provider component
export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  const refreshAnnouncements = (newAnnouncements) => {
    setAnnouncements(newAnnouncements);
    console.log('bhadwerefresh hoja');
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, refreshAnnouncements }}>
      {children}
    </AnnouncementContext.Provider>
  );
};
