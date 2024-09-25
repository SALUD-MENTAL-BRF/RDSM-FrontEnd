import { useNavigate } from "react-router-dom";
import '../../../assets/style/profile/profileProfessional.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch";
import { Professional } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../types/user.dto";
import { ArrowLeft, Book, Heart, Users } from 'lucide-react';

export const ProfileProfessional = () => {

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
  }, [id, authState.token]);

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
