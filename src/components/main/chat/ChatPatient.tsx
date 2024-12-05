import { useState, useEffect } from 'react';
import './Chat.css';
import io from 'socket.io-client';
import useAuth from '../../../hooks/useAuth';
import { CustomFetch } from '../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import { Chat } from './Chat';

let socket: any;

export function ChatPatient() {
  const { authState } = useAuth();
  const [data, setData] = useState<any>(null);
  const { professionalId } = useParams<{ professionalId: string }>();
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [hasJoined, setHasJoined] = useState(false); // Nuevo estado para evitar múltiples uniones

  const fetchData = async () => {
    if (authState.token) {
      try {
        const userData = await CustomFetch(
          `${import.meta.env.VITE_API_URL}request-videocall/token/${authState.token}`,
          'GET'
        );
        console.log('Datos del usuario:', userData);
        setData(userData);
        setUserName(userData.username);
        setRoom(Number(professionalId) + (userData.patientId));
        socket = io('/', {
          query: { userId: userData.patientId, userType: "patient" }
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  // Llamar fetchData al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Unirse automáticamente a la sala cuando `room` y `userName` estén listos
  useEffect(() => {
    if (socket && userName !== '' && room !== '' && !hasJoined) {
      socket.emit('join_room', room, (ack) => {
        console.log(`Unido a la sala: ${room}`);
        setHasJoined(true); // Evitar unirse múltiples veces
      });
    }
  }, [socket, userName, room, hasJoined]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <Chat socket={socket} username={userName} room={room} />
    </div>
  );
}
