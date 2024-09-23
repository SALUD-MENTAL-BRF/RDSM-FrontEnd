import { useNavigate } from "react-router-dom";
import '../../../assets/style/profile/profileProfessional.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch";
import { Professional } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../types/user.dto";

// export const ProfileProfessional = () => {


//     return (
//         <>    
//             <main className='container-fluid container-profileProfessional'>
//                 <div className="row w-100">
//                     <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
//                         <div role='button' onClick={() => navigate('/professionals')}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
//                                 <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
//                             </svg>
//                             <h6 className='ms-1'>Atrás</h6>
//                         </div>
//                     </section>

//                     {professionalState && userState ? (
//                         <InfoProfessional professional={professionalState} user={userState} />
//                     ) : (
//                         <div>Cargando...</div> 
//                     )}
//                     <section>
//                         <div role="button" style={{backgroundColor: "#10b981"}} className="rounded-1 text-white d-flex justify-content-center h-100">
//                             <p className="mt-1">Ver publicaciones</p>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mt-2 ms-1 bi bi-arrow-down" viewBox="0 0 16 16">
//                             <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
//                             </svg>
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </>
//     );
// };


import { ArrowLeft, Book, Heart, Users } from 'lucide-react';

interface ProfileData {
  name: string;
  surname: string;
  age: number;
  title: string;
  specialization: string;
  description: string;
  communicationPreference: string;
  available: boolean;
  publications: number;
  followers: number;
}

export const ProfileProfessional = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John',
    surname: 'Doe',
    age: 30,
    title: 'Software Developer',
    specialization: 'Web Development',
    description: 'Passionate about creating user-friendly web applications.',
    communicationPreference: 'Email',
    available: true,
    publications: 15,
    followers: 250,
  });

  const handleEdit = (field: keyof ProfileData, value: string | number | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const [professionalState, setProfessionalState] = useState<Professional | null>(null);
  const [userState, setUserState] = useState<User | null>(null);
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { id } = useParams();

  useEffect(() => {
      (async () => {
          if (id && authState.token) {
              const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/${id}`, 'GET');
              const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET');

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
                  <p>{profile.description || 'Sin descripción.'}</p>
                  <div className="mb-3">
                    <strong>Edad:</strong> {profile.age}
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
                  <h5>{profile.publications}</h5>
                  <p className="text-muted">Publicaciones</p>
                </div>
                <div className="col-4">
                  <Users size={24} className="iconProfileProfessional mb-2" />
                  <h5>{profile.followers}</h5>
                  <p className="text-muted">Seguidores</p>
                </div>
                <div className="col-4 mt-4">
                  <button className="btn btn-primary">
                    <Heart size={24} className="me-2" />
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
