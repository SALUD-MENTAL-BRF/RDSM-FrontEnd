import { useNavigate } from "react-router-dom";
import '../../../assets/style/profile/profileProfessional.css';
import { useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch";
import { ProfileProfessionalDto } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../types/user.dto";
import { ArrowLeft, Book, Heart, Users } from 'lucide-react';

export const ProfileProfessional = () => {
  const [reloadPage, setReloadPage] = useState(false)
  const [professionalState, setProfessionalState] = useState<ProfileProfessionalDto | null>(null);
  const [userState, setUserState] = useState<User | null>(null);
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { id } = useParams();
  const [consult, setConsult] = useState<boolean>(false)

  useEffect(() => {
      (async () => {
          if (id && authState.token) {
              const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/profile/${id}`, 'GET');
              const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET');
              const request = await CustomFetch(`${import.meta.env.VITE_API_URL}request-patient/patient/${user.id}`, "GET")
              if(request){
                setConsult(true)
              }
              setProfessionalState(professional);
              setUserState(user);
                       
          }
      })();
  }, [id, authState.token, reloadPage]);

  function calcularEdad(fechaNacimiento:string) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();


    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = nacimiento.getMonth();
    const diaNacimiento = nacimiento.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }

    return edad;
}


  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="card shadow-sm mt-5">
            <div className="headerProfileProfessional card-header text-white d-flex justify-content-between align-items-center">
              <button className="btn btn-link text-white" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
                Atrás
              </button>
              <h1 className="mb-0">Perfil</h1>
              <div></div> 
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center mb-4">
                <img src={
                    professionalState?.professional?.user?.imageUrl && professionalState.professional.user.imageUrl.length > 1 
                    ? professionalState.professional.user.imageUrl :
                                "/image-example/imageUser.jpg"
                        } alt="" className="image-profileProfessional"/>
                  <h2>{`${professionalState?.professional?.firstname} ${professionalState?.professional?.lastname}`}</h2>
                  <p className="text-muted">{professionalState?.professional?.title}</p>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col">
                      <h3 className="mb-3">Descripción</h3>
                      <p>{professionalState?.description || 'Sin descripción.'}</p>
                      <div className="mb-3">
                        <strong>Edad:</strong> {calcularEdad(professionalState?.professional?.birthdate!)}
                      </div>
                      <div className="mb-3">
                        <strong>Especialización:</strong> {professionalState?.professional?.specialization}
                      </div>
                      <div className="mb-3">
                        <strong>Preferencia de comunicación:</strong> {professionalState?.preference_communication}
                      </div>
                      <div className="mb-3">
                        <strong>Disponible:</strong> {professionalState?.availability ? 'Sí' : 'No'}
                      </div>
                    </div>
                    {
                      userState?.roleId == Number(import.meta.env.VITE_ROLE_PROFESSIONAL) && userState.id == professionalState?.professional?.userId && (
                        <div title="Editar" className="col text-end">
                          <svg onClick={() => navigate("/profile")} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                        </div>

                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row text-center">
                <div className="col-4">
                  <Book size={24} className="iconProfileProfessional mb-2" />
                  <p className="text-muted">Publicaciones</p>
                </div>
                <div className="col-4">
                  <Users size={24} className="iconProfileProfessional mb-2" />
                  <p className="text-muted">Seguidores</p>
                </div>
                <div className="col-4 mt-3">
                    {professionalState?.professional?.patient?.find(patient => patient.userId == userState?.id) ? <h6>¡Ya es tu médico!</h6> : consult ?
                      <h6>¡Tienes una solicitud pendiente!</h6>
                      : ""}
                    {
                        userState?.roleId == import.meta.env.VITE_ROLE_PATIENT || userState?.roleId == import.meta.env.VITE_ROLE_GUEST  && professionalState?.availability  ?
                        !consult && !(professionalState?.professional?.patient?.find(patient => patient.userId == userState?.id)) ?
                          <button onClick={() => navigate(`/form-patient/${id}/${userState?.id}`)} className="btn btn-primary">
                            <Heart size={24} className="" />
                              Consultar
                          </button>
                        :
                          <button disabled className="btn btn-primary">
                              <Heart size={24} className="" />
                              Consultar
                          </button>
                        :
                        <button disabled className="btn btn-primary">
                          <Heart size={24} className="" />
                          Consultar
                        </button> 
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
