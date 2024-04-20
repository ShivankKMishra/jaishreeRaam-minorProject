// ClassContext.js
import React, { createContext, useContext, useState } from "react";
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore"; // Import where and query from Firestore
import { getUserToken } from "../utils/sessionStorage/sessionStorage";
const ClassContext = createContext();
const userToken = getUserToken();
export const useClassContext = () => useContext(ClassContext);

export const ClassProvider = ({ children }) => {
  const db = getFirestore();
  const [classes, setClasses] = useState([]);

  const updateClasses = async () => {
    try {
      // Create a query to fetch classes where enrolledUsers array contains the current user's ID
      const q = query(collection(db, "classes"), where("enrolledUsers", "array-contains", userToken));
      const classSnapshot = await getDocs(q);
      const classData = classSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClasses(classData);
    } catch (error) {
      console.error("Error updating classes:", error);
    }
  };

  return (
    <ClassContext.Provider value={{ classes, updateClasses, setClasses }}>
      {children}
    </ClassContext.Provider>
  );
};
