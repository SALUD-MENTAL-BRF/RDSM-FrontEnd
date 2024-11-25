import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { CustomFetch } from '../../api/CustomFetch'; // Asegúrate de que la ruta sea correcta
import './formrequestforcall.css';

export const FormRequestForCall = () => {
  const { authState } = useAuth();
  const { professionalId } = useParams<{ professionalId: string }>();
  const [motivo, setMotivo] = useState('');
  const [fechaSolicitud, setFechaSolicitud] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    const fetchUserData = async () => {
      if (authState.token) {
        try {
          const userData = await CustomFetch(
            `${import.meta.env.VITE_API_URL}users/token/${authState.token}`,
            'GET'
          );
          if (userData && userData.id) {
            setUserId(userData.id); // Asigna el ID del usuario
          } else {
            console.error('No se pudo obtener el ID del usuario.');
          }
        } catch (error: any) {
          console.error('Error al obtener los datos del usuario:', error);
        } finally {
          setLoading(false); // Finaliza el estado de carga
        }
      }
    };

    fetchUserData();
  }, [authState.token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !professionalId) {
      console.error('Faltan datos obligatorios: User ID o Professional ID.');
      setError('Faltan datos obligatorios.');
      return;
    }

    const requestData = {
      motivo: motivo,
      fechaSolicitud: new Date(fechaSolicitud).toISOString(), // Convierte la fecha a un formato ISO
    };

    try {
      // Realiza el POST a la URL
      const data = await CustomFetch(
        `http://localhost:3000/request-videocall/${userId}/${professionalId}`,
        'POST',
        requestData
      );

      // Aquí puedes manejar el éxito de la solicitud
      alert('Solicitud enviada con éxito');
      console.log('Solicitud enviada con éxito:', data);
      // Opcionalmente, puedes limpiar el formulario o redirigir al usuario
    } catch (error: any) {
      console.error('Error al enviar la solicitud:', error);
      setError(`Hubo un problema al enviar la solicitud: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Cargando datos del usuario...</div>; // Mensaje mientras se obtienen los datos
  }

  return (
    <div className="form-container">
      <div style={{display: "flex", justifyContent:"center", minWidth: "100%",minHeight:"100vh", alignItems: "center"}}>
      <div style={{border: "solid black", padding: 30}}>
      <h2>Solicitud de Reunión</h2>
      {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error si existe */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="motivo">Motivo de la Solicitud:</label>
          <input
            type="text"
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaSolicitud">Fecha de la Reunión:</label>
          <input
            type="date"
            id="fechaSolicitud"
            value={fechaSolicitud}
            onChange={(e) => setFechaSolicitud(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
      </form>
      </div>
      </div>
    </div>
  );
};
