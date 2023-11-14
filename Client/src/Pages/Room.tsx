import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface TutorData {
  _id: string;
  name: string;
  // Add other properties as needed
}

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

// function randomID(len: number): string {
//   let result = '';
//   if (result) return result;
//   const chars =
//     '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
//   const maxPos = chars.length;

//   for (let i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function Room() {
  const tutorData = localStorage.getItem('tutorData');
  const parseData: TutorData | null = tutorData ? JSON.parse(tutorData) : null;
  const roomID: string = parseData?._id ?? "";
  const myMeeting = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parseData && myMeeting.current) {
      const userID = parseData._id;
      const userName = parseData.name;

      // generate token
      generateToken('https://nextjs-token.vercel.app/api', userID).then(
        (res) => {
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
            container: myMeeting.current,
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
        }
      );
    }
  }, [parseData, roomID]);

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
