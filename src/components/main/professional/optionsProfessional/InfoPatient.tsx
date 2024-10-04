import { useEffect,useState }  from 'react';
import { formPatientDto } from '../../../../types/patients.dto';
import { CustomFetch } from '../../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InfoPatient = () => {
    const [patientState,setPatientState] = useState<formPatientDto>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${id}`,"GET")
                
                setPatientState(patient)
            }
        )()
    },[])
  return (
    <div className="container mt-5">
              <div className="headerProfileProfessional card-header text-white d-flex justify-content-between align-items-center mb-1">
            <button className="btn btn-link text-white" onClick={() => navigate("/patient")}>
                <ArrowLeft size={24} />
                Atrás
            </button>
            <h1 className="p-2">Información del paciente</h1>
            <div></div> 
        </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">{patientState?.fullName}</h2>
          <div className="row">
            <div className="col text-center me-2">
                <img
                className='border border-dark'
                src={
                    patientState?.user?.imageUrl == null ?
                    "/image-example/imageUser.jpg"
                    :
                    patientState?.user?.imageUrl
                } alt="" />
            </div>
            <div className="col mt-2">
                <p className="card-text"><strong>Fecha de Nacimiento:</strong> {patientState?.date_birth}</p>
                <p className="card-text"><strong>Género:</strong> {patientState?.genre}</p>
                <p className="card-text"><strong>Provincia:</strong> {patientState?.locality?.province?.name}</p>
                <p className="card-text"><strong>Localidad:</strong> {patientState?.locality?.name}</p>
                <p className="card-text"><strong>Colonia o barrio:</strong> {patientState?.neighborhood}</p>
                <p className="card-text"><strong>Calle y número (o apartamento):</strong> {patientState?.streetNumber}</p>
                <p className="card-text"><strong>Teléfono:</strong> {patientState?.telephone}</p>
            </div>
          </div>
          <div className='mt-2'>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <div>
                    <h3 className="mt-4">Información Médica</h3>
                    <p className="card-text"><strong>Razón de Consulta:</strong> {patientState?.reasonConsultation}</p>
                    <p className="card-text"><strong>Descripción del Problema:</strong> {patientState?.descriptionProblem}</p>
                    <p className="card-text"><strong>Diagnósticos Previos:</strong> {patientState?.diagnosesPrevious}</p>
                    <p className="card-text"><strong>Tratamientos Previos:</strong> {patientState?.treatmentsPrevious}</p>
                    <p className="card-text"><strong>Hospitalizaciones Previas:</strong> {patientState?.hospitalizationsPrevious}</p>
                    <p className="card-text"><strong>Medicación Actual:</strong> {patientState?.meciationCurrent}</p>
                    <p className="card-text"><strong>Historial de Consumo:</strong> {patientState?.historyConsumption}</p>
                    <p className="card-text"><strong>Historial de Enfermedades:</strong> {patientState?.historyDiseases}</p>
                    <p className="card-text"><strong>Historial Familiar:</strong> {patientState?.histoyFamily}</p>

                    </div>

                </div>
                <div className="col">  
                    <h3 className="mt-4">Contacto de Emergencia</h3>
                    <p className="card-text"><strong>Nombre:</strong> {patientState?.contactEmergencyName}</p>
                    <p className="card-text"><strong>Relación:</strong> {patientState?.contactEmergencyRelation}</p>
                    <p className="card-text"><strong>Teléfono:</strong> {patientState?.contactEmergencyTelephone}</p>
                </div>
            </div>
          </div>


          

          {/* <h3 className="mt-4">Información de Usuario</h3>
          <p className="card-text"><strong>Nombre de Usuario:</strong> {patientState?.user?.username}</p>
          <p className="card-text"><strong>Email:</strong> {patientState?.user?.email}</p> */}
        </div>
      </div>
    </div>
  );
};