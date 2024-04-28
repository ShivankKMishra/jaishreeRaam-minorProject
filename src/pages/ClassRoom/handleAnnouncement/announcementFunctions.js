// announcementFunctions.js

import { useState } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"; // Import getDoc
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useAnnouncementFunctions = () => {
  const [loading, setLoading] = useState(false);

  const handleAnnouncement = async (id, announcementText, fileLocation, setAnnouncements, setShowAnnouncementSuccessDialog) => {
    try {
      setLoading(true);
      const db = getFirestore();
      const classRef = doc(db, "classes", id);

      const classSnap = await getDoc(classRef); // Use getDoc to get class data
      const currentAnnouncements = classSnap.data().announcements || [];

      let updatedFileLocation = null;
      if (fileLocation) {
        const storage = getStorage();
        const storageRef = ref(storage, `classFiles/${id}/${fileLocation.name}`);
        await uploadBytes(storageRef, fileLocation);
        updatedFileLocation = await getDownloadURL(storageRef);
      }

      const updatedAnnouncements = [...currentAnnouncements];
      const announcementData = { text: announcementText };
      if (updatedFileLocation) {
        announcementData.file = updatedFileLocation;
      }
      updatedAnnouncements.push(announcementData);

      await updateDoc(classRef, {
        announcements: updatedAnnouncements
      });

      setAnnouncements(updatedAnnouncements);
      setShowAnnouncementSuccessDialog(true);
      setLoading(false);
    } catch (error) {
      console.error("Error posting announcement:", error);
      setLoading(false);
    }
  };

  return { loading, handleAnnouncement };
};

export default useAnnouncementFunctions;
