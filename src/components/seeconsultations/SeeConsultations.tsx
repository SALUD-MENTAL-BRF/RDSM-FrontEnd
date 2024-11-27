import React, { useEffect, useState } from 'react';
import { CustomFetch } from '../../api/CustomFetch';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Header } from '../headers/Header';

export const SeeConsultations = () => {
    const { authState } = useAuth();

    interface Solicitud {
        id: number;
        motivo: string;
        fechaSolicitud: string;
        horaSolicitud: string;
        estadoSolicitud: string;
        patientId: number;
        professionalId: number;
    }

    interface Patient {
        id: string;
        fullName: string;
    }

    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [userPatientforId, setUserPatientforId] = useState<Patient[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (authState.token) {
                try {
                    const userData = await CustomFetch(
                        `${import.meta.env.VITE_API_URL}request-videocall/token/${authState.token}`,
                        'GET'
                    );
                    // console.log('Datos del usuario:', userData);

                    if (userData && userData.patientId) {
                        const url = `${import.meta.env.VITE_API_URL}request-videocall/${userData.patientId}`;
                        const url2 = `${import.meta.env.VITE_API_URL}patient/${userData.patientId}`;
                        // console.log('URL utilizada:', url);

                        const solicitudesData = await CustomFetch(url, 'GET');
                        // console.log('Datos de solicitudes:', solicitudesData);

                        if (solicitudesData && Array.isArray(solicitudesData.data)) {
                            setSolicitudes(solicitudesData.data);
                        }

                        const userPatientforIdData = await CustomFetch(url2, 'GET');
                        if (Array.isArray(userPatientforIdData)) {
                            setUserPatientforId(userPatientforIdData);
                        } else {
                            setUserPatientforId([userPatientforIdData]);
                        }
                    } else {
                        console.error('No se pudo obtener el ID del usuario.');
                    }
                } catch (error: any) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            }
        };

        fetchUserData();
    }, [authState.token]);

    const getPatientName = (patientId: number) => {
        const patient = userPatientforId.find((p) => p.id.toString() === patientId.toString());
        // console.log('Paciente encontrado:', patient);
        return patient ? patient.fullName : 'Desconocido';
    };

    const cancelSolicitud = async (solicitudId: number) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}request-videocall/${solicitudId}`;
            const data = await CustomFetch(url, 'DELETE');
            Swal.fire('Solicitud cancelada', 'La solicitud ha sido cancelada correctamente.', 'success');
            setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== solicitudId))
            console.log('Solicitud cancelada:', data);
        } catch (error: any) {
            console.error('Error al cancelar la solicitud:', error);
        }
    };

    return (

        <div>
            <Header/>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Ver Sesiones Programadas</h1>
            <table style={{ width: '80%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Paciente</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Motivo</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Hora</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Fecha</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Estado</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.length > 0 ? (
                        solicitudes.map((solicitud) => (
                            <tr key={solicitud.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {getPatientName(solicitud.patientId)}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {solicitud.motivo || 'No especificado'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {solicitud.horaSolicitud || 'No especificada'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {new Date(solicitud.fechaSolicitud).toLocaleDateString() || 'No especificada'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {solicitud.estadoSolicitud || 'No especificada'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    <button style={{ padding: '5px 10px' }} onClick={() => cancelSolicitud(solicitud.id)}>X Cancelar Solicitud X</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '8px' }}>
                                No se encontraron solicitudes.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
};
