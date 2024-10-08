import { useNavigate } from "react-router-dom";

export const AssignActivity = () => {
    const navigate = useNavigate()

    return(
        <div className="activitiesAssign-container mt-5 rounded-5">
     
                <h3 className="text-center">Actividades</h3>
        
                <div className="cardActivitiesPatient-container col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                    <div onClick={() => navigate("/activity-list")}   role="button" className="cardAddActivity d-flex justify-content-center align-items-center h-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="gray" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                    </div>
                    <h6 className="text-center mt-1">Añadir actividad</h6>
                </div>
        </div>
    )
}