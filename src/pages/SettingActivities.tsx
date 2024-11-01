import { Header } from "../components/headers/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SocialHabilitySetting } from "../components/main/professional/setting-activities/SocialHabilitySetting";

export const SettinActivitiesPage = () => {

    const {activityId} = useParams();
    const navigate = useNavigate();

    return(
        <>
            <Header/>
            <main className="container-fluid mb-5">
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                            <div role='button' onClick={() => navigate(-1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                                </svg>
                                <h6 className='ms-1'>Atrás</h6>
                            </div>
                    </section>
                    <div className="col-12">
                        {activityId == "3" ? <SocialHabilitySetting/> : 
                            <h6 className="text-center">Esta actividad no se puede configurar.</h6>
                        } 
                    </div>
                </div>
            </main>
        </>
    );
};