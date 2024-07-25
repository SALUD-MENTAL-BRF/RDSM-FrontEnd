import React from "react";
import { Aside } from "../aside/Aside";
import "../../assets/style/profile/profile.css";
import imageExample from "/image-example/imageUser.jpg";
import useAuth from "../../hooks/useAuth";

export const Profile: React.FC = () => {

  const { user } = useAuth()

  console.log(user)

  return (
    <>
      <main className="container-fluid containerMainProfile">
        <div className="row w-100">
          <div className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center containerMainProfile__Aside">
            <Aside />
          </div>
          <div className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 containerMainProfile__InformationUser">
            <div className="profile-header">
              <div className="user-info">
                <img src={user?.imageUrl ? user.imageUrl : imageExample} alt="User" className="userImage" />
                <div>
                  <h2>{user?.username}</h2>
                  <p>Genero: {user?.gender ? user?.gender : 'Puedes editar esta información si lo necesitas.'}</p>
                  <p>Edad: {user?.age ? user?.age : 'Puedes editar esta información si lo necesitas.'}</p>
                  <p>terapia: Debes ser un paciente para visualizar esta información</p>
                  <p>Ultima Sesión: Debes ser un paciente para visualizar esta información.</p>
                  <p>Terapeuta: Debes ser un paciente para visualizar esta informacion</p>
                  <p>User ID: {user?.id}</p>
                </div>
              </div>
            </div>
            <div className="profile-content row mt-5">
              <div className="col-12 col-md-6 col-lg-4 profile-section">
                <div className="treatment-plan">
                  <h3>Plan de tratamiento</h3>
                  <ul>
                    <li>Medicación ISRS: sesiones semanales</li>
                    <li>Larazepam: As needed</li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 profile-section">
                <div className="mental-health-stats">
                  <h3>Estadísticas de salud mental</h3>
                  <p>Nivel de ansiedad: Moderado</p>
                  <p>Estado de ánimo: estable</p>
                  <p>Estres: High</p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 profile-section">
                <div className="additional-stats">
                  <h3>Estadísticas adicionales</h3>
                  <ul>
                    <li>Horas de Sueño: promedio 8 horas 15 minutos</li>
                    <li>Actividad: promedio 8500 pasos</li>
                    <li>Peso: 70 kg</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
