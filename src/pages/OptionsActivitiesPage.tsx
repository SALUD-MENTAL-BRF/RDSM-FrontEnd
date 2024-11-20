import { Header } from "../components/headers/Header";
import { useNavigate } from "react-router-dom";
import '../assets/style/activities/ActivitiesManagement.css'
import { useParams } from "react-router-dom";
import { OptionsLogicalProblem } from "../components/main/activities/logical-problem/OptionsLogicalProblem";
import { OptionsSocialHability } from "../components/main/activities/social-hability/OptionsSocialHability";
import { SocialHabilitySetting } from "../components/main/professional/setting-activities/SocialHabilitySetting";
import { ProgressSocialHability } from "../components/main/activities/social-hability/ProgressSocialHability";

export const OptionActivitiesPage = () => {
    const {section,professionalId,patientId, activityId} = useParams() 
    const navigate = useNavigate();

    return(
        <>
            <Header/>
            <main className="container-fluid">
                <div className="d-flex mb-5">
                    <div className="col-1 mt-1 ms-5">
                        <div role='button' onClick={() => navigate(`/management-activities/${patientId}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            <h6 className='ms-1'>Atrás</h6>
                        </div>
                    </div>
                    {activityId == "5" ? <OptionsLogicalProblem/> :""}
                    {activityId == "3" ? <OptionsSocialHability/> : ""}
                </div>
                {activityId == "3" ?
                    <>
                        {section == "setting" ? <SocialHabilitySetting/> : <ProgressSocialHability/>}
                    </> :""
                }
            </main>
            
        </>
    );
};