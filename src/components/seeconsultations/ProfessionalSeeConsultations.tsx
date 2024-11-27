import React, { useEffect, useState } from 'react';
import { CustomFetch } from '../../api/CustomFetch';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Header } from '../headers/Header';

export const ProfessionalSeeConsultations = () => {
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
        id: number;
        fullName: string;
    }

    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);

    const fetchData = async () => {
        if (authState.token) {
            try {
                const userData = await CustomFetch(
                    `${import.meta.env.VITE_API_URL}request-videocall/professional/token/${authState.token}`,
                    'GET'
                );
                console.log('Datos del usuario:', userData);

                if (userData && userData.professionalId) {
                    const solicitudesUrl = `${import.meta.env.VITE_API_URL}request-videocall/professional/${userData.professionalId}`;
                    const solicitudesData = await CustomFetch(solicitudesUrl, 'GET');
                    console.log('Datos de solicitudes:', solicitudesData);
                    if (solicitudesData && Array.isArray(solicitudesData.data)) {
                        setSolicitudes(solicitudesData.data);

                        // Obtén todos los IDs únicos de pacientes
                        const patientIds = [...new Set(solicitudesData.data.map((s: Solicitud) => s.patientId))];

                        // Realiza una llamada para obtener todos los pacientes
                        const patientsData = await Promise.all(
                            patientIds.map(async (id) => {
                                const patientUrl = `${import.meta.env.VITE_API_URL}patient/${id}`;
                                return await CustomFetch(patientUrl, 'GET');
                            })
                        );

                        setPatients(patientsData);
                    }
                } else {
                    console.error('No se pudo obtener el ID del profesional.');
                }
            } catch (error: any) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [authState.token]);

    const updateSolicitudStatus = async (solicitudId: any, nuevoEstado: any) => {
        try {
            const response = await CustomFetch(
                `${import.meta.env.VITE_API_URL}request-videocall/status/${solicitudId}`,
                'PATCH',
                { nuevoEstado }
            );
            if (response.success) {
                console.log('Estado actualizado:', response.data);
                Swal.fire('Éxito', 'El estado de la solicitud fue actualizado correctamente.', 'success');
                fetchData();
            } else {
                console.error('Error al actualizar el estado:', response);
            }
        } catch (error) {
            console.error('Error en la actualización:', error);
        }
    };

    const getPatientName = (patientId: number): string => {
        const patient = patients.find((p) => p.id === patientId);
        return patient ? patient.fullName : 'Desconocido';
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
                                    <button style={{ padding: '5px 10px' }} onClick={() => updateSolicitudStatus(solicitud.id, 'ACEPTADA')}>
                                         Aceptar Solicitud 
                                    </button>
                                    <button style={{ padding: '5px 10px' }} onClick={() => updateSolicitudStatus(solicitud.id, 'CANCELADA')}>
                                         Cancelar Solicitud 
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '8px' }}>
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
