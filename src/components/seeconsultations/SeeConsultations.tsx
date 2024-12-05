import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Chip 
} from '@mui/material';
import { Cancel, CalendarToday, AccessTime } from '@mui/icons-material';
import { CustomFetch } from '../../api/CustomFetch';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Header } from '../headers/Header';
import { useNavigate } from 'react-router-dom';

export const SeeConsultations = () => {
    const { authState } = useAuth();
    const navigate = useNavigate();
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

                    if (userData && userData.patientId) {
                        const url = `${import.meta.env.VITE_API_URL}request-videocall/${userData.patientId}`;
                        const url2 = `${import.meta.env.VITE_API_URL}patient/${userData.patientId}`;

                        const solicitudesData = await CustomFetch(url, 'GET');
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
        return patient ? patient.fullName : 'Desconocido';
    };

    const cancelSolicitud = async (solicitudId: number) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}request-videocall/${solicitudId}`;
            await CustomFetch(url, 'DELETE');
            Swal.fire('Solicitud cancelada', 'La solicitud ha sido cancelada correctamente.', 'success');
            setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== solicitudId));
        } catch (error: any) {
            console.error('Error al cancelar la solicitud:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='row w-100' style={{ padding: '4%' }}>
                <div className="col-1">
                    <div role='button' onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Atrás</h6>
                    </div>
                </div>
                <div className='col'>
                <h1 className='text-center'>Sesiones Programadas</h1>
                <TableContainer component={Paper} style={{ marginTop: 30 }}>
                    <Table aria-label="sesiones programadas">
                        <TableHead>
                            <TableRow>
                                <TableCell>Paciente</TableCell>
                                <TableCell className="hide-on-mobile">Motivo</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell className="hide-on-mobile">Fecha</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {solicitudes.length > 0 ? (
                                solicitudes.map((solicitud) => (
                                    <TableRow key={solicitud.id}>
                                        <TableCell>{getPatientName(solicitud.patientId)}</TableCell>
                                        <TableCell className="hide-on-mobile">
                                            {solicitud.motivo || 'No especificado'}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <AccessTime fontSize="small" />
                                                <span>{solicitud.horaSolicitud || 'No especificada'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hide-on-mobile">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <CalendarToday fontSize="small" />
                                                <span>
                                                    {new Date(solicitud.fechaSolicitud).toLocaleDateString() ||
                                                        'No especificada'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={solicitud.estadoSolicitud || 'No especificada'}
                                                color={
                                                    solicitud.estadoSolicitud === 'ACEPTADA'
                                                        ? 'success'
                                                        : solicitud.estadoSolicitud === 'CANCELADA'
                                                        ? 'error'
                                                        : 'warning'
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                        {solicitud.estadoSolicitud === 'PENDIENTE' ? <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<Cancel />}
                                                size="small"
                                                onClick={() => cancelSolicitud(solicitud.id)}
                                            >
                                                Cancelar Solicitud
                                            </Button>
                                        </TableCell> : <TableCell>No disponible</TableCell>}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} style={{ textAlign: 'center', padding: '16px' }}>
                                        No se encontraron solicitudes.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        </div>
    );
};
