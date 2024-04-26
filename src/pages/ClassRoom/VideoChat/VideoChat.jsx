import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { getDatabase, ref, set } from "firebase/database";
import "./VideoChat.css";
import { useParams } from "react-router-dom"; // Import useParams

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoChat() {
  const [roomID, setRoomID] = useState(getUrlParams().get('roomID') || randomID(5));
  const [showVideo, setShowVideo] = useState(false);
  
  // Get the id parameter from the URL
  const { id } = useParams();
  // Log the id parameter
  console.log("Class ID passed to VideoChat component:", id);

  useEffect(() => {
    console.log("Room ID on load:", roomID);
  }, []); // Empty dependency array means this effect runs only once after component mount

  useEffect(() => {
    const myMeeting = async (element) => {
      // generate Kit Token
      const appID = 1313760783;
      const serverSecret = "b61a62cbf26d887a56cd164d5c862c24";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol + '//' +
              window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });

      // Store room ID in the Firebase Realtime Database along with the class ID
      storeRoomIDInDatabase(id, roomID);
    };

    const container = document.querySelector('.myCallContainer');
    if (container && showVideo) {
      myMeeting(container);
    }
  }, [roomID, showVideo]);

  const handleStartMeeting = () => {
    setShowVideo(true);
  };

  // Function to store room ID in the database along with the class ID
  const storeRoomIDInDatabase = (classID, roomID) => {
  // Get a reference to the database
  const db = getDatabase();

  // Reference to the location where room ID will be stored nested under the class ID
  const classRoomRef = ref(db, `classRooms/${classID}`);

  // Set the room ID under the class ID in the database
  set(classRoomRef, {
    roomID: roomID
  })
  .then(() => {
    console.log("Room ID stored under the class ID in the database successfully");
  })
  .catch((error) => {
    console.error("Error storing Room ID under the class ID:", error);
  });
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!showVideo && (
        <div className="center border rounded-xl hover:text-orange-600 w-36 flex justify-around">
          <button onClick={handleStartMeeting}>Start Meeting</button>
        </div>
      )}
      {showVideo && (
        <div className="myCallContainer w-full sm:w-3/4 lg:w-1/2 h-3/4 md:h-2/3 lg:h-2/3 xl:h-1/2 overflow-hidden"></div>
      )}
    </div>
  );
}
