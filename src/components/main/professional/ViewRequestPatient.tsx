import { formPatientDto } from "../../../types/patients.dto";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeRequest } from "./optionsRequest";
import Swal from "sweetalert2";
import '../../../assets/style/professional/ViewRequestPatient.css'

export const ViewRequestPatient = () => {
    const [patientRequest, setPatientRequest] = useState<formPatientDto>()
    const navigate = useNavigate()
    const {id} = useParams()
    
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}request-patient/${id}`)
                const data = await response.json()
                setPatientRequest(data)
            }
        )()
    },[])
  return (
    <div className="container mt-5">
        <div className="headerProfileProfessional card-header text-white d-flex justify-content-between align-items-center mb-1">
            <button className="btn btn-link text-white" onClick={() => navigate("/request-list")}>
                <ArrowLeft size={24} />
                Atrás
            </button>
            <h1 className="p-2">Información de la Solicutid</h1>
            <div></div> 
        </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{patientRequest?.fullName}</h2>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Fecha de Nacimiento:</strong> {patientRequest?.date_birth}</p>
              <p><strong>Género:</strong> {patientRequest?.genre}</p>
              <p><strong>Dirección:</strong> {patientRequest?.address}</p>
              <p><strong>Teléfono:</strong> {patientRequest?.telephone}</p>
            </div>
            <div className="col-md-6">
              <h3>Contacto de Emergencia</h3>
              <p><strong>Nombre:</strong> {patientRequest?.contactEmergencyName}</p>
              <p><strong>Relación:</strong> {patientRequest?.contactEmergencyRelation}</p>
              <p><strong>Teléfono:</strong> {patientRequest?.contactEmergencyTelephone}</p>
            </div>
          </div>
          <hr />
          <h3>Información Médica</h3>
          <p><strong>Razón de Consulta:</strong> {patientRequest?.reasonConsultation}</p>
          <p><strong>Descripción del Problema:</strong> {patientRequest?.descriptionProblem}</p>
          <p><strong>Diagnósticos Previos:</strong> {patientRequest?.diagnosesPrevious}</p>
          <p><strong>Tratamientos Previos:</strong> {patientRequest?.treatmentsPrevious}</p>
          <p><strong>Hospitalizaciones Previas:</strong> {patientRequest?.hospitalizationsPrevious}</p>
          <p><strong>Medicación Actual:</strong> {patientRequest?.meciationCurrent}</p>
          <p><strong>Historial de Consumo:</strong> {patientRequest?.historyConsumption}</p>
          <p><strong>Historial de Enfermedades:</strong> {patientRequest?.historyDiseases}</p>
          <p><strong>Historial Familiar:</strong> {patientRequest?.histoyFamily}</p>
          <hr />
        </div>
      </div>
      <div className="card-footer row mt-2 mb-2">
        <div className="text-center">
            <button className="request-patient-buttons btn btn-primary mb-2">Aceptar</button>
        </div>
        <div className="text-center">
            <button onClick={async () => {
            const response = await removeRequest(Number(patientRequest?.id));
            if(response.status == 200){
                return Swal.fire({
                                title: "Solicitud rechazada.",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "ok",
                        }).then(() => navigate("/request-list"))
                    };
                    }  
                } className="request-patient-buttons btn btn-danger">Rechazar</button>
        </div>
        </div>
    </div>
  );
};

