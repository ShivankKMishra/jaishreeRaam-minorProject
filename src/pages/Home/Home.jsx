import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cards from "./Cards/Cards";
import { isAuthenticated } from "../../utils/sessionStorage/sessionStorage"; // Import isAuthenticated function
import deleteClass from "../../class/DeleteClass/deleteClass"; // Import the deleteClass function

function Home() {
  const db = getFirestore();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classSnapshot = await getDocs(collection(db, "classes"));
        const classData = classSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, [db]);

  // Protect the route by redirecting if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect the user to the login page if not authenticated
      // You can replace "/login" with the actual login route path
      window.location.href = "/";
    }
  }, []);

  // Function to update classes after deletion
  const updateClasses = async () => {
    const classSnapshot = await getDocs(collection(db, "classes"));
    const classData = classSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setClasses(classData);
  };

  return (
    <div className="Home">
      {/* Pass the classes data to the cards component */}
      <div>
     
<Cards className=" border border-black " classes={classes} deleteClass={(class_id, creatorUid) => deleteClass(class_id, creatorUid, classes, setClasses, updateClasses)} updateClasses={updateClasses} />
 </div>
    </div>
  );
}

export default Home;
