import React,{ useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { activityXPatientDto} from "../../../types/activity.dto";
import { findActivitiesLinked } from "../professional/optionsProfessional/Request/fetchActivity";
import { useNavigate } from "react-router-dom";
import { CardActivity } from "../activities/CardActivity";

interface Props {
    setOpacity: React.Dispatch<React.SetStateAction<{
        answerActivities: number,
        answerRecommendations: number
    }>>;
    opacity: {
        answerActivities: number,
        answerRecommendations: number
    }
};

export const ActivitiesAssigned: React.FC<Props> = ({setOpacity, opacity}) => {
    const [contanerActivity, setContainerActivity] = useState<string>('700px')
    const [activitieState, setActivitiesState] = useState<Array<activityXPatientDto>>()
    const [saveActivities, setSaveActivities] = useState<Array<activityXPatientDto>>()
    const {patientId,professionalId} = useParams()
    const navigate = useNavigate()
    
    const chanBoxActivities = () => {
        if(contanerActivity === '700px'){
            setActivitiesState([])
            return setContainerActivity('0px')
        }
        setActivitiesState(saveActivities)
        return setContainerActivity('700px')
    };

    useEffect(() => {
        (
            async () => {
                const activities = await findActivitiesLinked(patientId!, professionalId!)
                setActivitiesState(activities)
                setSaveActivities(activities)
                
            }
        )()
    },[])

    return(
        <div style={{minHeight: contanerActivity}} className="activities-designated col-11 mt-4 rounded-4 ms-2 m-2">
            <div className="row h-100">
            <div className="d-flex">
                <div className="w-100">
                    <h4 className="text-center h4 fw-bold mb-3 mt-2">Actividades asignadas</h4>
                </div>
                <div  className="questionAll position-relative d-flex justify-content-end mt-3">

                    {   
                        contanerActivity == '700px' ?
                        <div className="me-1">
                            <svg onClick={chanBoxActivities} role="button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                            </svg>
                        </div>
                        :
                        <div className="me-1">
                            <svg onClick={chanBoxActivities} role="button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                        </div>
                    }


                        <div style={{opacity: opacity.answerActivities}} className="answerActivities position-absolute end-100 rounded-2 p-1">
                            <span className="text-white">En esta sección encontraras todas las actividades asignadas por tu médico.</span>
                        </div>
                    <div onMouseOut={() => setOpacity({...opacity, answerActivities:0})} onMouseOver={() => setOpacity({...opacity, answerActivities: 1})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                            <path role="button" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                    </div>
                </div>

            </div>
                <CardActivity professional={false} patientId={patientId!}  activitieState={activitieState}/>
        </div>
    </div>
    )
}