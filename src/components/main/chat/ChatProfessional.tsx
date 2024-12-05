import { useState, useEffect } from 'react';
import './Chat.css';
import io from 'socket.io-client';
import useAuth from '../../../hooks/useAuth';
import { CustomFetch } from '../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import { Chat } from './Chat';

let socket: any;

export function ChatProfessional() {
  const { authState } = useAuth();
  const { professionalId } = useParams<{ professionalId: string }>();
  const { patientId } = useParams<{ patientId: string }>();
  const [data, setData] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (authState.token) {
        console.log("ID Paciente", patientId);
        try {
          const userData = await CustomFetch(
            `${import.meta.env.VITE_API_URL}request-videocall/token/${authState.token}`,
            'GET'
          );
          console.log('Datos del profesional:', userData);
          setData(userData);
          setUserName(userData.username);
          setRoom(Number(professionalId) + Number(patientId));

          // Inicializa el socket después de obtener los datos
          socket = io('/', {
            query: {
              userId: professionalId,
              userType: "professional",
            },
          });
        } catch (error: any) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [authState.token, professionalId, patientId]);

  useEffect(() => {
    if (socket && userName && room) {
      socket.emit('join_room', room);
      console.log(`Profesional unido a la sala: ${room}`);
    }
  }, [socket, userName, room]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <Chat socket={socket} username={userName} room={room} />
    </div>
  );
}
