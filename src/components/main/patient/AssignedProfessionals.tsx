import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfessionalDto } from "../../../types/profileProfessional.dto";
import useAuth from "../../../hooks/useAuth";
import { CustomFetch } from "../../../api/CustomFetch";
import '../../../assets/style/HomePatient/assignedProfessionals.css'
import Swal from "sweetalert2";

export const AssignedProfessionals = () => {
    const [professionalState, setProfessionalState] = useState<Array<ProfessionalDto>>([]);
    const [patientId, setPatientId] = useState<number>(0)
    const navigate = useNavigate();
    const {authState} = useAuth()
    const [solicitudes, setSolicitudes] = useState<any[]>([]);

    useEffect(() => {
        (
            async () => {
                const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
                const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/user/${user.id}`, 'GET')                
                const data = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/patient/${patient.id}`, 'GET') 
                console.log("hola",patient.id)
                const checkSolicitudes = await CustomFetch(`${import.meta.env.VITE_API_URL}request-videocall/${patient.id}`, 'GET');
                setSolicitudes(checkSolicitudes.data)

                setProfessionalState(data.professional)
                setPatientId(patient.id)
            }
        )()
    },[]);


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
                <div className="info-professional col mt-2 ms-2 m-2 rounded-4 bg-light min-vh-100">

                    <div className="container py-5">
                        <h1 className="mb-4">Lista de profesionales</h1>
                        <div className="row">
                        {professionalState.map((professional) => (
                            <div key={professional.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                    src={professional.user?.imageUrl == null ? "/image-example/imageUser.jpg" : professional.user?.imageUrl }
                                    className="rounded-circle me-3"
                                    width="60"
                                    height="60"
                                    />
                                    <h5 className="card-title mb-0">{professional.lastname} {professional.firstname}</h5>
                                </div>
                                <ul className="list-group list-group-flush text-center">
                                    <a role="button" onClick={() => navigate(`/profile-professional/${professional.id}`)} className="info-professional-title list-group-item text-primary">Perfil</a>
                                    <a role="button" onClick={() => navigate(`/activities/${patientId}/${professional.id}`)} className="info-professional-title list-group-item text-success">Recomendaciones/Actividades</a>
                                    <a role="button" onClick={() => {solicitudes.length > 0 ? Swal.fire('Solicitud Denegada','Ya tienes una solicitud pendiente', 'error') : navigate(`/request-for-call/${patientId}/${professional.id}`)}} className="info-professional-title list-group-item text-info">Solicitar una Reunión</a>
                                </ul>
                                </div>
                                <div className="card-footer">
                                {/* <button className="btn btn-danger w-100">Dar de baja</button> */}
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