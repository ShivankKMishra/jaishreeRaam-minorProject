import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import "./VideoChat.css";

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

export default function App() {
  const [roomID, setRoomID] = useState(getUrlParams().get('roomID') || randomID(5));
  const [showVideo, setShowVideo] = useState(false);

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
    };

    const container = document.querySelector('.myCallContainer');
    if (container && showVideo) {
      myMeeting(container);
    }
  }, [roomID, showVideo]);

  const handleStartMeeting = () => {
    setShowVideo(true);
  };

  return (
    <div className="App">
      {!showVideo && (
        <div className="center border rounded-xl hover:text-orange-600 w-36 flex justify-around ">
          <button onClick={handleStartMeeting}>Start Meeting</button>
        </div>
      )}
      {showVideo && (
        <div className="myCallContainer" style={{ width: '50rem', height: '40rem', overflow: 'hidden' }}></div>
      )}
    </div>
  );
}
