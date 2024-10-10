import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../../api/CustomFetch";
import { activityDto } from "../../../../types/activity.dto";

export const AssignActivity = () => {
    const navigate = useNavigate();
    const {patientId} = useParams();
    const [activitiesLinkedState, setActivitiesLinkedState] = useState<Array<activityDto>>([]);
    useEffect(() => {
        (
            async () => {
                const activitiesLinked = await CustomFetch(`${import.meta.env.VITE_API_URL}activity/${patientId}`, 'GET');

                setActivitiesLinkedState(activitiesLinked)
            }
        )();
    },[]);

    return(
        <div className="activitiesAssign-container mt-5 rounded-5">
            <h3 className="text-center">Actividades</h3>
            <div className="row d-flex justify-content-center">
            {
                    activitiesLinkedState?.map((activity) => (
                        <div key={activity.id} onClick={() => {}} className='d-flex justify-content-center mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3'>
                            <div className ={`card-activityList`}>
                                <div className="card-content">
                                <h4>
                                    {activity.title}
                                </h4>
                                <div className='container-infocard'>
                                    <h5 className='activityDescription'>Descripción</h5>
                                    <p className={`activityDescriptionText ${activity.description.length < 120 ? 'mb-5': ''}`}>
                                        {activity.description}
                                    </p>
                                    <h5 className='activityCategory'>Categoría</h5>
                                    <p className='activityType'>{activity.categoryActivities.type}</p>

                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="cardActivitiesPatient-container mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                    <div onClick={() => navigate(`/activity-list/${patientId}`)}   role="button" className="cardAddActivity d-flex justify-content-center align-items-center h-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="gray" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                    </div>
                    <h6 className="text-center mt-1">Añadir actividad</h6>
                </div>
            </div>
        </div>
    );
};