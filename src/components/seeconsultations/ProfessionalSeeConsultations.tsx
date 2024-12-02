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
import { Check, Trash } from 'lucide-react';

export const ProfessionalSeeConsultations: React.FC = () => {
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
                if (userData && userData.professionalId) {
                    const solicitudesUrl = `${import.meta.env.VITE_API_URL}request-videocall/professional/${userData.professionalId}`;
                    const solicitudesData = await CustomFetch(solicitudesUrl, 'GET');
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

    const deletedSolicitud = async (solicitudId: number) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}request-videocall/${solicitudId}`;
            await CustomFetch(url, 'DELETE');
            Swal.fire('Solicitud cancelada', 'La solicitud ha sido cancelada correctamente.', 'success');
            fetchData();
        } catch (error: any) {
            console.error('Error al cancelar la solicitud:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="scheduled-sessions" style={{ padding: "4%" }}>
                <h1>Ver Sesiones Programadas</h1>
                
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
                                        <TableCell className="hide-on-mobile">{solicitud.motivo || 'No especificado'}</TableCell>
                                        <TableCell>
                                            <div className="icon-text">
                                                <AccessTime fontSize="small" />
                                                <span style={{margin: 7, padding: 2}}>{solicitud.horaSolicitud || 'No especificada'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hide-on-mobile">
                                            <div className="icon-text">
                                                <CalendarToday fontSize="small" />
                                                <span style={{margin: 7, padding: 2}}>{new Date(solicitud.fechaSolicitud).toLocaleDateString() || 'No especificada'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={solicitud.estadoSolicitud || 'No especificada'} 
                                                color={solicitud.estadoSolicitud === 'ACEPTADA' ? 'success' : solicitud.estadoSolicitud === 'CANCELADA' ? 'error' : 'warning'} 
                                                size="small" 
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {solicitud.estadoSolicitud === 'PENDIENTE' ? <><Button 
                                                variant="contained" 
                                                color="success" 
                                                size="small" 
                                                startIcon={<Check />}
                                                onClick={() => updateSolicitudStatus(solicitud.id, 'ACEPTADA')}
                                            >
                                                Aceptar
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                size="small" 
                                                onClick={() => updateSolicitudStatus(solicitud.id, 'CANCELADA')}
                                                startIcon={<Cancel />}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Cancelar
                                            </Button></> : null}
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                size="small" 
                                                onClick={() => deletedSolicitud(solicitud.id)}
                                                startIcon={<Trash />}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Eliminar Solicitud
                                            </Button>
                                        </TableCell>
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
    );
};
