import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { getUserToken } from "../../utils/sessionStorage/sessionStorage";

const deleteClass = async (class_id, creatorUid, classes, setClasses, updateClasses) => {
  const db = getFirestore();
  const userToken = getUserToken();

  // Log the user token for verification
  console.log("User Token:", userToken);

  // Extract localId from the user token
  const localId = userToken;

  // Check if the current user is the creator of the class
  if (localId === creatorUid) {
    // Check if the user wants to confirm deletion
    if (window.confirm("Do you want to delete this class?")) {
      try {
        // Delete the class document from Firestore
        await deleteDoc(doc(db, "classes", class_id));
        // Update the classes state to reflect the deletion
        setClasses(classes.filter((classData) => classData.id !== class_id));
        // Call the updateClasses callback to refresh the home cards
        updateClasses();
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  } else {
    alert("You are not authorized to delete this class.");
  }
};

export default deleteClass;
