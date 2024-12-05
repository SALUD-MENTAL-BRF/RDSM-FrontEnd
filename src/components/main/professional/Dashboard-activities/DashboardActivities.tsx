import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomFetch } from "../../../../api/CustomFetch";
import useAuth from "../../../../hooks/useAuth";
import { activityXPatientDto } from "../../../../types/activity.dto";
import { findActivitiesLinked } from "../optionsProfessional/Request/fetchActivity";
import { useNavigate } from "react-router-dom";
import { ActivityContainer } from "./ActivityContainer";
import { ProfessionalDto } from "../../../../types/profileProfessional.dto";

export const DashboardActivities = () => {
    const {patientId} = useParams();
    const {authState} = useAuth();
    const [activitiesLinkedState, setActivitiesLinkedState] = useState<Array<activityXPatientDto>>([]);
    const navigate = useNavigate();
    const [professionalState, setProfessionalState] = useState<ProfessionalDto>();
    useEffect(() =>{
        (
            async () => {
                const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
                const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/user/${user.id}`, 'GET')
                const activities = await findActivitiesLinked(patientId!, professional.id)
                setActivitiesLinkedState(activities);
                setProfessionalState(professional);
            }
        )()
    },[]);

    return(
        <main className="row w-100">
            <div className="col-1 mt-1 ms-4">
                <div role='button' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Atrás</h6>
                </div>
            </div>
            <div className="col">
                <div className="row mt-5">
                    {
                        activitiesLinkedState.map((activity) => (
                            <ActivityContainer key={activity.activityId} professionalId={professionalState?.id!} activityId={activity.activityId} title={activity.activity.title}/>
                        )
                        )
                    }
                </div>
            </div>
        </main>
    );
};