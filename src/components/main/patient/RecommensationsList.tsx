import React, { useEffect, useState } from "react";
import { findRecommendations } from "../professional/optionsProfessional/Request/fetchRecommendations";
import { recomendationDto } from "../../../types/recomendation.dto";
import { useParams } from "react-router-dom";

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

export const RecommendationsList: React.FC<Props> = ({opacity, setOpacity}) => {
    const [recommendationState, setRecommendationState] = useState<Array<recomendationDto>>()
    const {patientId,professionalId} = useParams()

    useEffect(() => {
        (
            async () => {
                const recommendation = await findRecommendations(patientId!, professionalId!)
                setRecommendationState(recommendation)
            }
        )()
    },[])

    return(
        <div className="recommendations col-11 mt-4 rounded-4 ms-2 m-2 mb-5">
            <div className="row h-100">
                <div className="d-flex w-100">
                    <div className="w-100">
                        <h4 className="text-center h4 fw-bold mb-3 mt-2">Recomendaciones médicas</h4>
                    </div>
                    <div  className="questionAll position-relative d-flex justify-content-end mt-3">
                            <div style={{opacity: opacity.answerRecommendations}} className="answerActivities position-absolute end-100 rounded-2 p-1">
                                <span className="text-white">En esta sección vas a encontrar las recomendaciones que te anota tu médico.</span>
                            </div>
                        <div onMouseOut={() => setOpacity({...opacity, answerRecommendations:0})} onMouseOver={() => setOpacity({...opacity, answerRecommendations: 1})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                <path role="button" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="row">
                {recommendationState?.length === 0 ? (
                    <p className="text-center">No hay recomendaciones disponibles.</p>
                    ) : (
                    <ul className="ms-3 list-group list-group-flush">
                        {recommendationState?.map((recommendation) => (
                        <li key={recommendation.id} className="list-group-item">
                            <h5 className="mb-1">{recommendation.title}</h5>
                            <p className="mb-0">{recommendation.description}</p>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                <div className=" d-flex align-items-end justify-content-end me-1 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0
                        1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                        
                    </svg>
                </div>

            </div>
        </div>
    )
}