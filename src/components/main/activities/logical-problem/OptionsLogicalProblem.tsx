import { useNavigate,useParams } from "react-router-dom";


export const OptionsLogicalProblem = () => {
    const navigate = useNavigate()
    const {section,professionalId,patientId,activityId} = useParams()

    return(
        <div className="row  w-100 mt-5">
            <div onClick={() => navigate(`/options-activity/${activityId}/history/${professionalId}/${patientId}`)} 
                className={`col-6 text-end options-ActivitiesManagements 
                ${section == 'history'?'select-option-history':''}`
                }>
                <h5 role="button" className="text-ActivitiesManagements mt-1">Historial</h5>
            </div>
                <div onClick={() => navigate(`/options-activity/${activityId}/setting/${professionalId}/${patientId}`)} className={`col-6 
                    ${section == 'setting'?'select-option-setting':''}
                    `}>
                <h5 role="button" className="text-ActivitiesManagements mt-1">Configuración</h5>
             </div>
        </div> 
    )
};