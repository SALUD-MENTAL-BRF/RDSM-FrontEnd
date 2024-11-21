import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/Header";
import { CreateRecommendation } from "../components/main/professional/optionsProfessional/CreateRecommendation";
import { AssignActivity } from "../components/main/professional/optionsProfessional/AssignActivity";
import { CustomFetch } from "../api/CustomFetch";
import { formPatientDto } from "../types/patients.dto";
import useAuth from "../hooks/useAuth";

type Tab = "recommendations" | "activities";

export const ManagementActivitiesPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();

  const [activeTab, setActiveTab] = useState<Tab>(() => 
    (localStorage.getItem('activeTab') as Tab) || 'recommendations'
  );
  const [professionalId, setProfessionalId] = useState<number | null>(null);
  const [patient, setPatient] = useState<formPatientDto | null>(null);

  useEffect(() => {
    (
        async () => {
            const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${patientId}`, 'GET')
            const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
            const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/user/${user.id}`, 'GET')
            setProfessionalId(professional.id)
            setPatient(patient)
        }
    )()
},[])

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };



  return (
    <>
      <Header />
      <main className="container-fluid mb-5 mt-2">
        <div className="row">
          <div className="col-12 col-md-2 col-lg-1 text-center mb-3">
            <div role='button' onClick={() => navigate('/patient')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                </svg>
                <h6 className='ms-1'>Atrás</h6>
            </div>
          </div>    
          <div className="col-12 col-md-10 col-lg-11">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-2">Administrador de paciente:</h3>
                {patient && (
                  <div className="text-center mb-5">
                    <h5>{patient.fullName}</h5>
                  </div>
                )}
                <div className="d-flex justify-content-center mb-4">
                  <div className="btn-group" role="group" aria-label="Management options">
                    <button 
                      onClick={() => handleTabChange('recommendations')} 
                      className={`btn ${activeTab === 'recommendations' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      Recomendaciones
                    </button>
                    <button 
                      onClick={() => handleTabChange('activities')} 
                      className={`btn ${activeTab === 'activities' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      Actividades
                    </button>
                  </div>
                </div>
                {professionalId && (
                  activeTab === 'activities' 
                    ? <AssignActivity professionalId={professionalId} /> 
                    : <CreateRecommendation professionalId={professionalId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};