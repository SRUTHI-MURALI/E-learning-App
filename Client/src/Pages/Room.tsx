

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const tutorData = localStorage.getItem("tutorData");
const parseData= JSON.parse(tutorData);

// get token
function generateToken(tokenServerUrl, userID) {
 
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len: number) {
  let result = '';
  if (result) return result;
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length
   
 
  for (let i = 0; i < len;i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Room() {
  const roomID =  parseData._id;
  const myMeeting = async (element: HTMLDivElement) => {
    const userID = parseData._id;
    const userName = parseData.name;
    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.origin +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showTurnOffRemoteCameraButton: true, // Add this property
        showTurnOffRemoteMicrophoneButton: true, // Add this property
        showRemoveUserButton: true, // Add this property
      });
      
    });
  };


  

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
