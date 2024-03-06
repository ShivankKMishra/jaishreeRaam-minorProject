import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Cards from "./Cards/Cards";
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

  return (
    <div className="Home">
      {/* Pass the classes data to the cards component */}
      <div>
      <Cards className=" border border-black " classes={classes} />
    </div>
    </div>
  );
}

export default Home;
