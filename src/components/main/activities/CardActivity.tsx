import React from "react";
import { activityXPatientDto } from "../../../types/activity.dto";
import { useNavigate } from "react-router-dom";
import { redirectPage } from "./RedirectPage";

interface Props {
    activitieState?: Array<activityXPatientDto>;
    professional: boolean;
    unlinkActivity?: (id: number) => void;
    patientId: string;
    professionalId?: string | number;
};

export const CardActivity: React.FC<Props> =  ({activitieState, professional, unlinkActivity, patientId, professionalId}) => {

    const navigate = useNavigate();

   
    return (
                <div className="row justify-content-center">
                    {
                        activitieState?.map((data) => (
                            <div role={professional && unlinkActivity ? "" :"button"} key={data.id} onClick={() => {}} className='row d-flex justify-content-center mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4'>
                                <div onClick={() => 
                                       !professional ? navigate(`/play-activity/${patientId}/${professionalId}/${data.activityId}`)  : ''
                                    } 
                                    className ={`card-activityList`} style={professional && unlinkActivity ? {height: '32rem'} :{} }>
                                    {
                                    professional && unlinkActivity ? 
                                        <div className="text-end mt-1 me-2 d-flex">
                                            <div className="w-100">
                                                <svg onClick={() => unlinkActivity(data.id)} role="button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </div>
                                        </div>
                                        :
                                    ""
                                    }
                                    <div className="card-content">
                                        <h4 className={professional && unlinkActivity ? 'card-professional-h4':'card-h4'}>
                                            {data.activity.title}
                                        </h4>
                                        <div className='container-infocard'>
                                        <h5 className={professional && unlinkActivity ? 'activityDescription-professional' :'activityDescription'}>Descripción</h5>
                                        <p className={`${professional && unlinkActivity ? 'activityDescriptionText-professional' :'activityDescriptionText'} 
                                        ${data.activity.description.length < 120 ? 'mb-5': ''}`}>
                                                {data.activity.description}
                                        </p>
                                        <h5 className={professional && unlinkActivity ?'activityCategory-professional':'activityCategory'}>Categoría</h5>
                                        <p className={professional && unlinkActivity ? 'activityType-professional ' :'activityType'}>{data.activity.categoryActivities?.type}</p>
                                      {  
                                        professional && unlinkActivity ?
                                        <div className="options-professional w-100">
                                            <h6 role="button" onClick={() =>redirectPage(data.activity.id) !== undefined ? navigate(`${redirectPage(data.activity.id)}/history/${professionalId}/${patientId}`) :""}
                                                >Ver historial</h6>
                                            <h6 role="button"onClick={() =>redirectPage(data.activity.id) !== undefined ? navigate(`${redirectPage(data.activity.id)}/setting/${professionalId}/${patientId}`) :""}
                                                >Configuración</h6>
                                        </div>:''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    professional ?
                    <div className="cardActivitiesPatient-container mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                        <div onClick={() => navigate(`/activity-list/${patientId}/${professionalId}`)}   role="button" className="cardAddActivity d-flex justify-content-center align-items-center h-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="gray" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                        </div>
                        <h6 className="text-center mt-1">Añadir actividad</h6>
                    </div>
                    :""
                }
        </div>
    );
};