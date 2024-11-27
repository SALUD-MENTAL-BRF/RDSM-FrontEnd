import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { CustomFetch } from '../../api/CustomFetch';
import { Header } from '../headers/Header';
import Swal from 'sweetalert2';
import {
  PageContainer,
  FormContainer,
  FormWrapper,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  LoadingMessage
} from './StyleForm';

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
                    console.log('Datos del usuario:', userData.patientId);
                    if (userData && userData.id) {
                        setUserId(userData.id);
                        console.log('User ID establecido:', authState.token);
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
        return (
            <PageContainer>
                <Header />
                <LoadingMessage>Cargando datos del usuario...</LoadingMessage>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Header />
            <FormContainer>
                <FormWrapper>
                    <Title>Solicitud de Reunión</Title>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <form onSubmit={handleSubmit}>
                        {!userId ? (
                            <LoadingMessage>Cargando datos del usuario...</LoadingMessage>
                        ) : (
                            <>
                                <FormGroup>
                                    <Label htmlFor="motivo">Motivo de la Solicitud:</Label>
                                    <Input
                                        type="text"
                                        id="motivo"
                                        value={motivo}
                                        onChange={(e) => setMotivo(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="fechaSolicitud">Fecha de la Reunión:</Label>
                                    <Input
                                        type="date"
                                        id="fechaSolicitud"
                                        value={fechaSolicitud}
                                        onChange={(e) => setFechaSolicitud(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="horaSolicitud">Hora de la Reunión:</Label>
                                    <Input
                                        type="time"
                                        id="horaSolicitud"
                                        value={horaSolicitud}
                                        onChange={(e) => setHoraSolicitud(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <Button type="submit">
                                    Enviar Solicitud
                                </Button>
                            </>
                        )}
                    </form>
                </FormWrapper>
            </FormContainer>
        </PageContainer>
    );
};

