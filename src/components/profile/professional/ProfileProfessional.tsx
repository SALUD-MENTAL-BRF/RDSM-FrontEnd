import { useNavigate } from "react-router-dom";
import '../../../assets/style/profile/profileProfessional.css';
import { useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch";
import { Professional } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../types/user.dto";
import { ArrowLeft, Book, Heart, Users } from 'lucide-react';
import Swal from "sweetalert2";

export const ProfileProfessional = () => {
  const [reloadPage, setReloadPage] = useState(false)
  const [professionalState, setProfessionalState] = useState<Professional | null>(null);
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
              const request = await CustomFetch(`${import.meta.env.VITE_API_URL}request-patient/${user.id}/${id}`, "GET")
              if(request){
                setConsult(true)
              }
              setProfessionalState(professional);
              setUserState(user);
          }
      })();
  }, [id, authState.token, reloadPage]);


  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Edita tu perfil',
      html: `
        <div>
          <p>Preferencia de comunicación:</p>
          <select class="input-EditProfileProfessional" id="preference_communication">
            <option value="Sin preferencias">Sin preferencias</option>
            <option value="Virtual">Virtual</option>
            <option value="Presencial">Presencial</option>
          </select>
          <p>Disponible</p>
          <select class="input-EditProfileProfessional" id="availability">
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
          <p>Descripción</p>
          <textarea class="input-EditProfileProfessional" id="description" class="form-control" id="descripcionProblema"></textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: '#059669',
      didOpen: () => {
        const availabilityElement = document.getElementById('availability') as HTMLSelectElement;
        const preference_communicationElement = document.getElementById('preference_communication') as HTMLSelectElement;
        const descriptionElement = document.getElementById("description") as HTMLTextAreaElement;


        if (preference_communicationElement ) {
          preference_communicationElement.value = professionalState?.preference_communication || "Sin preferencias" ;
        };
        if (descriptionElement ) {
          descriptionElement.value = professionalState?.description || "Sin descripción." ;
        };
        if (availabilityElement) {
          availabilityElement.value = professionalState?.availability?.toString() || '';
        };
      },
      preConfirm: () => {

        const availability = (document.getElementById('availability') as HTMLSelectElement).value;
        const preference_communication = (document.getElementById('preference_communication') as HTMLSelectElement).value;
        const description = (document.getElementById("description") as HTMLTextAreaElement).value;
        return { availability: availability == "true" ? true : false , preference_communication, description};

        
      },
    })
  
    await CustomFetch(`${import.meta.env.VITE_API_URL}professional/${professionalState?.id}`, 'PUT', formValues)
    setReloadPage(!reloadPage)
  };
  

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="card shadow-sm mt-5">
            <div className="headerProfileProfessional card-header text-white d-flex justify-content-between align-items-center">
              <button className="btn btn-link text-white" onClick={() => navigate("/professionals")}>
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
                  <h2>{`${professionalState?.professional.firstname} ${professionalState?.professional.lastname}`}</h2>
                  <p className="text-muted">{professionalState?.professional.title}</p>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col">
                      <h3 className="mb-3">Descripción</h3>
                      <p>{professionalState?.description || 'Sin descripción.'}</p>
                      <div className="mb-3">
                        <strong>Edad:</strong> {}
                      </div>
                      <div className="mb-3">
                        <strong>Especialización:</strong> {professionalState?.professional.specialization}
                      </div>
                      <div className="mb-3">
                        <strong>Preferencia de comunicación:</strong> {professionalState?.preference_communication}
                      </div>
                      <div className="mb-3">
                        <strong>Disponible:</strong> {professionalState?.availability ? 'Sí' : 'No'}
                      </div>
                    </div>
                    {
                      userState?.roleId == 2 && userState.id == professionalState?.professional.userId && (
                        <div title="Editar" className="col text-end">
                          <svg onClick={handleSubmit} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
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
                  {/* <h5>{profile.publications}</h5> */}
                  <p className="text-muted">Publicaciones</p>
                </div>
                <div className="col-4">
                  <Users size={24} className="iconProfileProfessional mb-2" />
                  {/* <h5>{profile.followers}</h5> */}
                  <p className="text-muted">Seguidores</p>
                </div>
                <div className="col-4 mt-3">
                    
                    {
                        userState?.roleId == 3 || userState?.roleId == 4  && professionalState?.availability && !consult  ?
                    <button onClick={() => navigate(`/form-patient/${id}/${userState.id}`)} className="btn btn-primary">
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
