import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { CustomFetch } from '../../api/CustomFetch';
import './formrequestforcall.css';
import { Header } from '../headers/Header';
import Swal from 'sweetalert2';

export const FormRequestForCall = () => {
    const { authState } = useAuth();
    const { professionalId } = useParams<{ professionalId: string }>();
    const [motivo, setMotivo] = useState('');
    const [fechaSolicitud, setFechaSolicitud] = useState('');
    const [horaSolicitud, setHoraSolicitud] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (authState.token) {
                try {
                    const userData = await CustomFetch(
                        `${import.meta.env.VITE_API_URL}request-videocall/token/${authState.token}`,
                        'GET'
                    );
                    console.log('Datos del usuario:', userData.patientId); // Verifica los datos del usuario
                    if (userData && userData.id) {
                        setUserId(userData.id);
                        console.log('User ID establecido:', authState.token); // Verifica que se está actualizando
                    } else {
                        console.error('No se pudo obtener el ID del usuario.');
                    }
                } catch (error: any) {
                    console.error('Error al obtener los datos del usuario:', error);
                } finally {
                    setLoading(false);
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
            fechaSolicitud: new Date(fechaSolicitud).toISOString(),
            horaSolicitud: horaSolicitud,
        };

        try {
            const data = await CustomFetch(
                `http://localhost:3000/request-videocall/${userId}/${professionalId}`,
                'POST',
                requestData
            );
            Swal.fire('Solicitud enviada con éxito', 'La solicitud ha sido enviada correctamente.', 'success');
            navigate('/assigned-professionals')
            console.log('Solicitud enviada con éxito:', data);
        } catch (error: any) {
            console.error('Error al enviar la solicitud:', horaSolicitud);
            setError(`Hubo un problema al enviar la solicitud: ${error.message}`);
        }
    };

    if (loading) {
        return <div>Cargando datos del usuario...</div>;
    }

    return (
        <div>
            <Header />
            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "center", minWidth: "100%", minHeight: "75vh", alignItems: "center" }}>
                    <div style={{ border: "solid black 1px", padding: 30, borderRadius: "5px" }}>
                        <h2>Solicitud de Reunión</h2>
                        {error && <div className="error-message">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            {!userId ? (
                                <p>Cargando datos del usuario...</p>
                            ) : (
                                <>
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
                                    <div className="form-group">
                                        <label htmlFor="horaSolicitud">Hora de la Reunión:</label>
                                        <input
                                            type="time"
                                            id="horaSolicitud"
                                            value={horaSolicitud}
                                            onChange={(e) => setHoraSolicitud(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Enviar Solicitud
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
