import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useAuth from '../hooks/useAuth';
import { CustomFetch } from '../api/CustomFetch';
import { Header } from '../components/headers/Header';
// import { Chat } from '../components/main/chat/Chat';
import { ChatProfessional } from '../components/main/chat/ChatProfessional';
interface User {
  email: string;
  googleId: string;
  id: number;
  imageUrl: string;
  password: string;
  roleId: number;
  username: string;
  createdAt: string;
}

function randomID(len: number) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallRoom() {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const initializedRef = useRef(false); // Controla si la sala ya fue inicializada
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (authState.token) {
      (async () => {
        const userData = await CustomFetch(
          `${import.meta.env.VITE_API_URL}users/token/${authState.token}`,
          'GET'
        );
        setUser(userData);
      })();
    }
  }, [authState.token]);

  const roomID = getUrlParams().get('roomID') || randomID(5);

  const generateMeetingLink = () => {
    return (
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?roomID=' +
      roomID
    );
  };

  const myMeeting = async () => {
    if (initializedRef.current || !user) {
      return; // Evita llamadas repetidas
    }

    const { id: userID, username: userName } = user;
    const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);

    try {
      const response = await fetch(
        `http://localhost:3000/zegocloud/generate-token?appId=${appID}&userId=${userID}&secret=${import.meta.env.VITE_ZEGOCLOUD_APP_SECRET}&effectiveTimeInSeconds=3600`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }

      const textResponse = await response.text();

      let token;
      try {
        const responseData = JSON.parse(textResponse);
        token = responseData.token;
      } catch (e) {
        token = textResponse.trim();
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        roomID,
        String(userID),
        userName
      );
    
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onReturnToHomeScreenClicked: () => {
          window.location.href = '/patient';
        },
      });

      initializedRef.current = true; // Marca como inicializado
    } catch (error) {
      console.error('Error generating token or joining room:', error);
    }
  };

  useEffect(() => {
    if (!initializedRef.current && containerRef.current) {
      myMeeting();
    }
  }, [user]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <Header />
      {/* <div>
        <p>Meeting Link: <a href={generateMeetingLink()}>{generateMeetingLink()}</a></p>
      </div> */}
      <div
        className="myCallContainer"
        ref={containerRef}
        style={{ width: '100%', height: '84%' }}
      ></div>
      {/* <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      // ...existing code...
      </div> */}
      <ChatProfessional />
    </div>
  );
}
