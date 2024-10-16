import { Header } from "../components/headers/Header"
import { CreateRecommendation } from "../components/main/professional/optionsProfessional/CreateRecommendation"
import { AssignActivity } from "../components/main/professional/optionsProfessional/AssignActivity"
import { useNavigate } from "react-router-dom"
import '../assets/style/professional/ManagementActivities.css'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CustomFetch } from "../api/CustomFetch"
import { formPatientDto } from "../types/patients.dto"
import useAuth from "../hooks/useAuth"

export const ManagementActivitiesPage = () => {
    const {authState} = useAuth()
    const initialComponentState = localStorage.getItem('changeComponent') === 'true'
    const [professionalId, setProfessionalId] = useState<number>()
    const [changeComponent, setChangeComponent]= useState<boolean>(initialComponentState)
    const navigate = useNavigate()
    const {patientId} = useParams()
    const [patientState, setPatientState] = useState<formPatientDto>()

    const changeValue = (change: boolean) => {
        setChangeComponent(change)
        localStorage.setItem('changeComponent', String(change))
    }

    useEffect(() => {
        (
            async () => {
                const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${patientId}`, 'GET')
                const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
                const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/${user.id}`, 'GET')
                setProfessionalId(professional.id)
                setPatientState(patient)
            }
        )()
    },[])



    return(
        <>
            <Header/>
            <main className="container-fluid mb-5">
                <div className="row w-100">

                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                            <div role='button' onClick={() => navigate('/patient')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                                </svg>
                                <h6 className='ms-1'>Atrás</h6>
                            </div>
                    </section>
                </div>
                <div className="row">
                    <div className="text-center">
                        <h6 className="" style={{color: "#059669"}}>Paciente:</h6>
                        <h5>{patientState?.fullName}</h5>
                        <button onClick={() => changeValue(false)} className={`btn ${changeComponent ? 'management-activitiesButtons' : 'btn-primary'} rounded-3 me-1`}>Crear recomendación</button>
                        <button onClick={() => changeValue(true)} className={`btn ${changeComponent ? 'btn-primary' : 'management-activitiesButtons'} rounded-3 ms-1`}>Asignar actividad</button>
                    </div>
                    {changeComponent ? <AssignActivity professionalId={professionalId!}/> :  <CreateRecommendation professionalId={professionalId!}/> }
                </div>
            </main>
        </>
    )
}
