import { useNavigate } from "react-router-dom";
import '../../../assets/style/profile/profileProfessional.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch";
import { Professional } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../types/user.dto";
import { InfoProfessional } from "./InfoProfessional";

export const ProfileProfessional = () => {
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
        <>    
            <main className='container-fluid container-profileProfessional'>
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                        <div role='button' onClick={() => navigate('/professionals')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            <h6 className='ms-1'>Atrás</h6>
                        </div>
                    </section>

                    {professionalState && userState ? (
                        <InfoProfessional professional={professionalState} user={userState} />
                    ) : (
                        <div>Cargando...</div> 
                    )}
                    <section>
                        <div role="button" style={{backgroundColor: "#10b981"}} className="rounded-1 text-white d-flex justify-content-center h-100">
                            <p className="mt-1">Ver publicaciones</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mt-2 ms-1 bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};



