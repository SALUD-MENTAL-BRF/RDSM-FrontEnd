import { useNavigate } from "react-router-dom";
import '../../../assets/style/HomePatient/Activities.css'
import { useState } from "react";
import { ActivitiesAssigned } from "./ActivitiesAssigned";
import { RecommendationsList } from "./RecommensationsList";
interface Opacity {
    answerRecommendations: number;
    answerActivities: number;
}

export const Activities = () => {
    const [opacity, setOpacity] = useState<Opacity>({
        answerActivities: 0,
        answerRecommendations: 0
    })
    const navigate = useNavigate()

    return(
        <main>
            <div className="container-fluid">
                <div className="col-1 mt-1 ms-4">
                    <div role='button' onClick={() => navigate('/assigned-professionals')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Atrás</h6>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <ActivitiesAssigned opacity={opacity} setOpacity={setOpacity}/>
                    <RecommendationsList opacity={opacity} setOpacity={setOpacity}/>
                </div>
            </div>
        </main>
    );
};

