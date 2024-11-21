import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Book, Heart, Users, Pencil } from 'lucide-react';
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { CustomFetch } from "../../../api/CustomFetch";
import { ProfileProfessionalDto } from "../../../types/profileProfessional.dto";
import { User } from "../../../types/user.dto";

export const ProfileProfessional = () => {
  const navigate = useNavigate();
  const [professionalState, setProfessionalState] = useState<ProfileProfessionalDto | null>(null);
  const [userState, setUserState] = useState<User | null>(null);
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
      }, [id, authState.token]);

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

  const isOwnProfile = userState?.roleId === Number(import.meta.env.VITE_ROLE_PROFESSIONAL) && 
                       userState.id === professionalState?.professional?.userId;

  const canConsult = (userState?.roleId === import.meta.env.VITE_ROLE_PATIENT || 
                      userState?.roleId === import.meta.env.VITE_ROLE_GUEST) && 
                      professionalState?.availability;

  const isAlreadyDoctor = professionalState?.professional?.patient?.some(patient => patient.userId === userState?.id);



  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="card shadow-sm mt-5">
            <div style={{backgroundColor: '#10b981'}} className="card-header text-white d-flex justify-content-between align-items-center">
              <button className="btn btn-link text-white" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
                Atrás
              </button>
              <h1 className="mb-0">Perfil</h1>
              <div style={{width: '72px'}}></div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <img
                    src={professionalState?.professional?.user?.imageUrl || "/image-example/imageUser.jpg"}
                    alt={`${professionalState?.professional?.firstname} ${professionalState?.professional?.lastname}`}
                    className="rounded-circle img-fluid mb-3"
                    style={{width: '200px', height: '200px', objectFit: 'cover'}}
                  />
                  <h2>{`${professionalState?.professional?.firstname} ${professionalState?.professional?.lastname}`}</h2>
                  <p className="text-muted">{professionalState?.professional?.title}</p>
                </div>
                <div className="col-md-8">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3>Descripción</h3>
                    {isOwnProfile && (
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/profile")} aria-label="Editar perfil">
                        <Pencil size={16} />
                      </button>
                    )}
                  </div>
                  <p>{professionalState?.description || 'Sin descripción.'}</p>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <strong>Edad:</strong> {calcularEdad(professionalState?.professional?.birthdate!)}
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Especialización:</strong> {professionalState?.professional?.specialization}
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Preferencia de comunicación:</strong> {professionalState?.preference_communication}
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Disponible:</strong> {professionalState?.availability ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row text-center">
                <div className="col-4">
                  <Book size={24} className="mb-2" />
                  <p className="text-muted">Publicaciones</p>
                </div>
                <div className="col-4">
                  <Users size={24} className="mb-2" />
                  <p className="text-muted">Seguidores</p>
                </div>
                <div className="col-4">
                  {isAlreadyDoctor ? (
                    <p className="font-weight-bold mt-3">¡Ya es tu médico!</p>
                  ) : consult ? (
                    <p className="font-weight-bold mt-3">¡Tienes una solicitud pendiente!</p>
                  ) : canConsult ? (
                    <button onClick={() => navigate(`/form-patient/${id}/${userState?.id}`)} className="btn btn-primary mt-3">
                      <Heart size={16} className="mr-2" />
                      Consultar
                    </button>
                  ) : (
                    <button disabled className="btn btn-primary mt-3">
                      <Heart size={16} className="mr-2" />
                      Consultar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

