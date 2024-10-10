import '../../../../assets/style/professional/ActivityList.css'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CustomFetch } from '../../../../api/CustomFetch'
import { activityDto } from '../../../../types/activity.dto'
import { likedActivityWithPatient } from './Request/fetchActivity'
import Swal from 'sweetalert2'

export const ActivityList : React.FC= () => {
    const navigate = useNavigate()
    const {patientId} = useParams()
    const [activitieState, setActivitieState] = useState<Array<activityDto>>()
    const [activitySelected, setActivitySelected] = useState<Array<number>>([])
    const [activitiesLinkedState, setActivitiesLinkedState] = useState<Array<activityDto>>([])

    useEffect(() => {
        (
            async () => {
                const activities = await CustomFetch(`${import.meta.env.VITE_API_URL}activity`, 'GET');
                const activitiesLinked = await CustomFetch(`${import.meta.env.VITE_API_URL}activity/${patientId}`, 'GET');
                setActivitiesLinkedState(activitiesLinked)
                setActivitieState(activities)
                
            }
        )()
    },[])


    const selectActivity = (id: number) => {        
        if (activitySelected.find(value => value == id)){
            setActivitySelected(activitySelected.filter(value => value !== id ))
        } else {
            setActivitySelected(prevstate => [...prevstate, id])
        }
    }

    const lindedActivity = async () => {
        if (activitySelected.length < 1) return Swal.fire({
            title: "Error",
            text: "No se selecciono ninguna actividad.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          })
        const response = await likedActivityWithPatient(patientId!, activitySelected);
        
        if(response.status == 200){
            Swal.fire({
                title: "Se añadio la actividad",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ok",
            }).then(() => {
                return navigate(`/management-activities/${patientId}`)
            })
        }   

    };

    return(
        <div className="container">
            <div className='d-flex justify-content-center'>
            <table className='text-center' id="myTable">
                <thead>
                    <tr>
                        <th>Trastorno</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td valign="top" width="150" align="center">
                        <select className="w-100 text-center" name="" id="">
                            <option value="">--</option>
                        </select>
                    </td>
                    <td valign="top" width="150" align="center">
                        <select className="w-100 text-center" name="" id="">
                            <option value="">--</option>
                        </select>
                    </td>
                </tr>

                </tbody>
            </table>

            </div>
            <div className="row activityList-container d-flex justify-content-center">
                {
                    activitieState?.map((activity) => (
                        <div key={activity.id} onClick={() => {

                            if(activitiesLinkedState.find(value => value.id == activity.id)){
                                return 
                            };
                            selectActivity(activity.id)
                            
                            }} className='d-flex justify-content-center mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3'>
                            <div className ={`card-activityList
                                ${activitiesLinkedState.find(value => value.id == activity.id) ? 'bg-secondary' : ''}
                                ${activitySelected.find(value => value == activity.id) ? 'border border-2 border-dark':''}`
                                
                                }>
                                {
                                    activitiesLinkedState.find(value => value.id == activity.id) ?
                                    <h6 className='text-white text-center mt-1'>Actividad añadida</h6>
                                    : ""
                                }
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
                
            </div>
            <div className="text-center mb-2 mt-2">
                <button onClick={lindedActivity}  className='btn btn-primary'>Añadir</button>
                <button onClick={() => navigate(`/management-activities/${patientId}`)} className='btn btn-danger ms-2'>Cancelar</button>
            </div>

        </div>
    )
}