// Home.jsx
import React, { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import getFirestore
import { getUserToken } from "../../utils/sessionStorage/sessionStorage";
import { useClassContext } from '../../contexts/ClassesContext'; // Import useClassContext
import deleteClass from "../../class/DeleteClass/deleteClass";
import Cards from "./Cards/Cards";
import { isAuthenticated } from "../../utils/sessionStorage/sessionStorage"; 

function Home() {
  const { classes, updateClasses, setClasses } = useClassContext(); // Access classes, updateClasses, and setClasses from context
  const userToken = getUserToken();
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch classes where enrolledUsers array contains the current user's ID
        const classSnapshot = await getDocs(collection(db, "classes"));
        const classData = classSnapshot.docs
          .filter(doc => doc.data().enrolledUsers && doc.data().enrolledUsers.includes(userToken))
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(classData); // Update classes using setClasses from context
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, [db, userToken, setClasses]);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="Home">
      <div>
        <Cards
          className=" border border-black "
          classes={classes}
          deleteClass={(class_id, creatorUid) => deleteClass(class_id, creatorUid, classes, setClasses, updateClasses)}
          updateClasses={updateClasses}
        />
      </div>
    </div>
  );
}

export default Home;
