import '../../../../assets/style/professional/ActivityList.css'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CustomFetch } from '../../../../api/CustomFetch'
import { activityDto } from '../../../../types/activity.dto'

export const ActivityList : React.FC= () => {
    const navigate = useNavigate()
    const {patientId} = useParams()
    const [activitieState, setActivitieState] = useState<Array<activityDto>>()
    useEffect(() => {
        (
            async () => {
                const activities = await CustomFetch(`${import.meta.env.VITE_API_URL}activity`, 'GET')

                
                setActivitieState(activities)
                
            }
        )()
    },[])

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
                        <div className="d-flex justify-content-center mt-1 mb-1 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <div className = "card-activityList">
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
                <button  className='btn btn-primary'>Añadir</button>
                <button onClick={() => navigate(`/management-activities/${patientId}`)} className='btn btn-danger ms-2'>Cancelar</button>
            </div>

        </div>
    )
}