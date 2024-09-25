import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { formPatientDto } from "../../../types/patients.dto"
import useAuth from "../../../hooks/useAuth"
import '../../../assets/style/professional/RequestPatient.css'
import { removeRequest } from "./optionsRequest"
import Swal from "sweetalert2"

export const RequestPatient = () => {
    const [requestPatient, setRequestPatient] = useState<Array<formPatientDto>>()
    const {authState} = useAuth()
    const [reloadPage, setReloadPage] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
       (
        async () => {
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`);
            const user = await userResponse.json()
            const professionalResponse = await fetch(`${import.meta.env.VITE_API_URL}professional/${user.id}`);
            const professional = await professionalResponse.json()
            const patientRequestReponse = await fetch(`${import.meta.env.VITE_API_URL}request-patient/${professional.id}`)
            const patientRequest = await patientRequestReponse.json()
            setRequestPatient(patientRequest)
        }
       )() 
    },[reloadPage])


    return(
        <main className="container-fluid">
        <div className="row w-100">


            <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                    <div role='button' onClick={() => navigate('/home')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Atrás</h6>
                    </div>
            </section>
            <div className="col mt-2 ms-2 m-2 rounded-4 bg-light min-vh-100">

                <div className="container container-request py-5">
                    <h1 className="mb-4">Solicitudes</h1>
                    <div className="row bg-secondary-emphasis h-100">

                    {requestPatient?.map((patient) => (
                        <div key={patient.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                {/* <img
                                src={patient.user.imageUrl}
                                className="rounded-circle me-3"
                                width="60"
                                height="60"
                                /> */}
                                <h5 className="card-title mb-0 text-center w-100">{patient.fullName}</h5>
                            </div>
                            {/* <ul className="list-group list-group-flush">
                                <a href="#" className="list-group-item text-primary">Información</a>
                                <a href="#" className="list-group-item text-success">Actividades</a>
                                <a href="#" className="list-group-item text-info">Reunión</a>
                            </ul> */}
                            </div>
                            <div className="card-footer">
                            <button className="btn btn-primary w-100 mb-2">Ver solicitud</button>
                            <button className="btn btn-primary w-100 mb-2">Aceptar</button>
                            <button onClick={async () => {
                                
                                const response = await removeRequest(Number(patient.id));
                                if(response.status == 200){
                                    setReloadPage(!reloadPage)
                                    return Swal.fire({
                                        title: "Solicitud rechazada.",
                                        icon: "success",
                                        confirmButtonColor: "#3085d6",
                                        confirmButtonText: "ok",
                                      })
                                };
                                }  
                                } className="btn btn-danger w-100">Rechazar</button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
        </div>
    </main>
    )
}