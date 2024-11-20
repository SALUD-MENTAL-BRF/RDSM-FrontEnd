import React, { useEffect, useState } from 'react';
import '../../assets/style/profile/profile.css';
import useAuth from '../../hooks/useAuth';
import { CustomFetch } from '../../api/CustomFetch';
import Swal from 'sweetalert2';
import { formatInTimeZone } from "date-fns-tz";

const imageExample = './image-example/imageUser.jpg'

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

export const Profile: React.FC = () => {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');
  const [user, setUser] = useState<User>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Convertir la fecha de creación a la zona horaria de Argentina
  const formatCreatedAt = (createdAt: string) => {
    const timeZone = 'America/Argentina/Buenos_Aires';
    return formatInTimeZone(createdAt, timeZone, 'dd/MM/yyyy HH:mm:ss');
  };

  useEffect(() => {
    if (authState.token) {
      CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [authState.token]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar una imagen para actualizar el perfil.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}users/image/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authState.token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Perfil actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        setUser((prevUser) => prevUser ? { ...prevUser, imageUrl: result.imageUrl } : undefined);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el perfil.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container-fluid profile-page'>
      <main className='container pt-5'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='card'>
              <img
                src={
                  user?.imageUrl ? user.imageUrl : imageExample}
                alt='Foto de perfil'
                className='card-img-top rounded-circle mx-auto d-block mt-3'
                style={{ width: '150px', height: '150px' }}
              />
              <div className='card-body text-center'>
                <h5 className='card-title'>{user?.username}</h5>
                <p className='card-text'>Usuario desde: {user?.createdAt ? formatCreatedAt(user.createdAt) : 'Fecha no disponible'}</p>
              </div>
            </div>
            <div className='list-group mt-4'>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                Perfil
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'sesiones' ? 'active' : ''}`}
                onClick={() => setActiveTab('sesiones')}
              >
                Mis Sesiones
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'recursos' ? 'active' : ''}`}
                onClick={() => setActiveTab('recursos')}
              >
                Recursos
              </button>
            </div>
          </div>
          <div className='col-md-9'>
            {activeTab === 'perfil' && (
              <div className='card'>
                <div className='card-body'>
                  <h3 className='card-title'>Mi Perfil</h3>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='nombre' className='form-label'>
                        Nombre
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='nombre'
                        value={user?.username}
                        readOnly
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='email' className='form-label'>
                        Email
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={user?.email.toUpperCase()}
                        readOnly
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='imagenPerfil' className='form-label'>
                        Cambiar Imagen de Perfil
                      </label>
                      <input
                        type='file'
                        className='form-control'
                        id='imagenPerfil'
                        onChange={handleFileChange}
                      />
                    </div>
                    <button type='submit' className='btn btn-primary' disabled={isLoading}>
                      {isLoading ? 'Actualizando...' : 'Actualizar Perfil'}
                    </button>
                  </form>
                </div>
              </div>
            )}
            {activeTab === 'sesiones' && (
              <div className='card'>
                <div className='card-body'>
                  <h3 className='card-title'>Mis Sesiones</h3>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Profesional</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>15/06/2023</td>
                        <td>Dra. María López</td>
                        <td>
                          <span className='badge bg-success'>Completada</span>
                        </td>
                      </tr>
                      <tr>
                        <td>22/06/2023</td>
                        <td>Dr. Juan Pérez</td>
                        <td>
                          <span className='badge bg-warning'>Pendiente</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'recursos' && (
              <div className='card'>
                <div className='card-body'>
                  <h3 className='card-title'>Recursos</h3>
                  <div className='list-group'>
                    <a href='#' className='list-group-item list-group-item-action'>
                      <div className='d-flex w-100 justify-content-between'>
                        <h5 className='mb-1'>Guía de Meditación</h5>
                        <small>3 días atrás</small>
                      </div>
                      <p className='mb-1'>
                        Aprende técnicas de meditación para reducir el estrés.
                      </p>
                    </a>
                    <a href='#' className='list-group-item list-group-item-action'>
                      <div className='d-flex w-100 justify-content-between'>
                        <h5 className='mb-1'>Ejercicios de Respiración</h5>
                        <small>1 semana atrás</small>
                      </div>
                      <p className='mb-1'>
                        Técnicas de respiración para la ansiedad.
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
