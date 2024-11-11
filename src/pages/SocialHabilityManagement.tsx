import { Header } from "../components/headers/Header";
import { useNavigate } from "react-router-dom";
import '../assets/style/activities/SocialHabilityManagement.css'
import { ProgressSocialHability } from "../components/main/activities/social-hability/ProgressSocialHability";
import { useState } from "react";
import { SocialHabilitySetting } from "../components/main/professional/setting-activities/SocialHabilitySetting";

export const SocialHabilityManagement = () => {
    const navigate = useNavigate();
    const [tabState, setTabState] = useState<boolean>(false)

    return(
        <>
            <Header/>
            <main className="container-fluid">
                <div className="d-flex mb-5">
                    <div className="col-1 mt-1 ms-5">
                        <div role='button' onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            <h6 className='ms-1'>Atrás</h6>
                        </div>
                    </div>
                    <div className="row  w-100 mt-5">
                        <div onClick={() => setTabState(false)} className={`col-6 text-end options-SocialHabilityManagement 
                            ${!tabState?'select-option-history':''}`
                            }>
                            <h5 role="button" className="text-SocialHabilityManagement mt-1">Historial</h5>
                        </div>
                        <div onClick={() => setTabState(true)} className={`col-6 
                            ${tabState?'select-option-setting':''}
                            `}>
                            <h5 role="button" className="text-SocialHabilityManagement mt-1">Configuración</h5>
                        </div>
                    </div>
                </div>
                {
                    tabState ? <SocialHabilitySetting/> : <ProgressSocialHability/>
                }
            </main>
            
        </>
    );
};