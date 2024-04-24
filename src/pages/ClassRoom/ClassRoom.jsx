import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserToken } from "../../utils/sessionStorage/sessionStorage";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAnnouncementContext } from "../../contexts/AnnouncementContext";

const ClassRoom = () => {
  const { id } = useParams();
  const { refreshAnnouncements } = useAnnouncementContext();
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showAnnouncementSuccessDialog, setShowAnnouncementSuccessDialog] = useState(false); // New state variable
  const [fileInputKey, setFileInputKey] = useState(0);
  const [fileLocation, setFileLocation] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setUserToken(getUserToken());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const classRef = doc(db, "classes", id);
        const classSnap = await getDoc(classRef);
        if (classSnap.exists()) {
          const classData = classSnap.data();
          setClassName(classData.name);
          setIsCreator(classData.creatorUid === userToken);
          setAnnouncements(classData.announcements || []);
        } else {
          console.log("Class not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };

    fetchData();
  }, [id, userToken]);

  const handleAnnouncement = async () => {
    try {
      setLoading(true);
      setShowSuccessDialog(false);
      setShowAnnouncementSuccessDialog(false); // Reset announcement success dialog state
      const db = getFirestore();
      const classRef = doc(db, "classes", id);

      const classSnap = await getDoc(classRef);
      const currentAnnouncements = classSnap.data().announcements || [];

      let updatedFileLocation = null;
      if (fileLocation) {
        const storage = getStorage();
        const storageRef = ref(storage, `classFiles/${id}/${fileLocation.name}`);
        await uploadBytes(storageRef, fileLocation);
        updatedFileLocation = await getDownloadURL(storageRef);
        console.log("File uploaded successfully:", updatedFileLocation);
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

      console.log("Announcement posted successfully");
      setAnnouncementText("");
      setFileLocation(null);
      setAnnouncements(updatedAnnouncements);
      setShowAnnouncementSuccessDialog(true); // Show announcement success dialog
      setLoading(false);
    } catch (error) {
      console.error("Error posting announcement:", error);
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileLocation(file);
    console.log("File selected:", file.name);
  };

  const handleCopyClassID = () => {
    navigator.clipboard.writeText(id)
      .then(() => {
        setShowSuccessDialog(true);
        console.log("Class ID copied to clipboard:", id);
      })
      .catch(error => {
        console.error("Error copying class ID to clipboard:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div class="relative flex justify-center items-center">
          <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full h-28 w-28" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Class: {className}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded-sm text-xs sm:text-sm"
              onClick={handleCopyClassID}
            >
              Copy ID
            </button>
          </h1>
          
          {isCreator && (
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <input
                  type="text"
                  className="border border-gray-300 rounded px-4 py-2 mr-2 mb-2 sm:mb-0 w-full sm:w-3/4 text-sm"
                  placeholder="Enter announcement"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                />
                <input
                  key={fileInputKey}
                  type="file"
                  className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/4 text-sm"
                  onChange={handleFileUpload}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-xs sm:text-sm"
                onClick={handleAnnouncement}
              >
                Post Announcement
              </button>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            <ul>
              {announcements.map((announcement, index) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <p>{announcement.text}</p>
                  {announcement.file && (
                    <a href={announcement.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Download File</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {showAnnouncementSuccessDialog && ( // Render announcement success dialog
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <p className="text-green-500 font-bold text-sm sm:text-base">Announcement posted successfully!</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded-sm text-xs sm:text-sm"
                  onClick={() => setShowAnnouncementSuccessDialog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showSuccessDialog && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
                <p className="text-green-500 font-bold text-sm sm:text-base">Class ID copied to clipboard!</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded-sm text-xs sm:text-sm"
                  onClick={() => setShowSuccessDialog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassRoom;
