import { useNavigate } from "react-router-dom";
import '../../../assets/style/professional/PatientList.css'
import { useEffect, useState } from "react";
import { formPatientDto } from "../../../types/patients.dto";
import useAuth from "../../../hooks/useAuth";
import { CustomFetch } from "../../../api/CustomFetch";
import { ProfessionalDto } from "../../../types/profileProfessional.dto";
import Swal from "sweetalert2";

export const PatientManagement = () => {
    const [patientsState, setPatientState] = useState<Array<formPatientDto>>([]);
    const [professionalState, setProfessional] = useState<ProfessionalDto>()
    const navigate = useNavigate();
    const {authState} = useAuth()


    useEffect(() => {
        (
            async () => {
                const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
                const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/user/${user.id}`, 'GET')                
                const data = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/professional/${professional.id}`, 'GET') 
                setPatientState(data.patient)
                setProfessional(professional)
            }
        )()
    },[]);

    const desvincular = (patientId: number) => {
        Swal.fire({
            text: '¿Seguro que quiere desvincularse del paciente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, desvincular',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              const response = await fetch(`${import.meta.env.VITE_API_URL}professional/desvincular/${professionalState?.id}/${patientId}`,{
                method:'DELETE'
              })
              if(response.status == 200){
                  Swal.fire(
                    'Desvinculado',
                    'El paciente ha sido desvinculado.',
                    'success'
                  )
              }
            }
          })
    };


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
                <div className="info-patient col mt-2 ms-2 m-2 rounded-4 bg-light min-vh-100">

                    <div className="container py-5">
                        <h1 className="mb-4">Lista de pacientes</h1>
                        <div className="row">
                        {patientsState.map((patient) => (
                            <div key={patient.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                    src={patient.user?.imageUrl == null ? "/image-example/imageUser.jpg" : patient.user?.imageUrl }
                                    className="rounded-circle me-3"
                                    width="60"
                                    height="60"
                                    />
                                    <h5 className="card-title mb-0">{patient.fullName}</h5>
                                </div>
                                <ul className="list-group list-group-flush text-center">
                                    <a role="button" onClick={() => navigate(`/information-patient/${patient.id}`)} className="info-patient-title list-group-item text-primary">Información</a>
                                    <a role="button" onClick={() => navigate(`/management-activities/${patient.id}`)} className="info-patient-title list-group-item text-success">Recomendaciones/Actividades</a>
                                    <a role="button" className="info-patient-title list-group-item text-info">Reunión</a>
                                </ul>
                                </div>
                                <div className="card-footer">
                                <button onClick={() => desvincular(patient.id!)} className="btn btn-danger w-100">Desvincularse</button>
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