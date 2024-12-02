import { useEffect,useState }  from 'react';
import { InfoPatientDto, patientDto } from '../../../../types/patients.dto';
import { CustomFetch } from '../../../../api/CustomFetch';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

export const InfoPatient = () => {
    const [patientState,setPatientState] = useState<patientDto>()
    const [InfoPatientState, setInfoPatient] = useState<InfoPatientDto>()
    const {id} = useParams()
    const navigate = useNavigate()
    const {authState} = useAuth()
    useEffect(() => {
        (
            async () => {
                const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/${id}`,"GET")
                const user = await  CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
                const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/user/${user.id}`, 'GET')
                const InfoPatient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/info/${patient.id}/${professional.id}`, 'GET')      
                setPatientState(patient)
                setInfoPatient(InfoPatient)
                console.log(InfoPatient);
                
            }
        )()
    },[])
  return (
    <div className="container mt-5">
        <div style={{backgroundColor: '#10b981'}} className="card-header text-white d-flex justify-content-between align-items-center">
            <button className="btn btn-link text-white" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
                Atrás
            </button>
            <h1 className="mb-2 mt-2">Información del paciente</h1>
            <div style={{width: '72px'}}></div>
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
                    <p className="card-text"><strong>Razón de Consulta:</strong> {InfoPatientState?.reasonConsultation}</p>
                    <p className="card-text"><strong>Descripción del Problema:</strong> {InfoPatientState?.descriptionProblem}</p>
                    <p className="card-text"><strong>Diagnósticos Previos:</strong> {InfoPatientState?.diagnosesPrevious}</p>
                    <p className="card-text"><strong>Tratamientos Previos:</strong> {InfoPatientState?.treatmentsPrevious}</p>
                    <p className="card-text"><strong>Hospitalizaciones Previas:</strong> {InfoPatientState?.hospitalizationsPrevious}</p>
                    <p className="card-text"><strong>Medicación Actual:</strong> {InfoPatientState?.meciationCurrent}</p>
                    <p className="card-text"><strong>Historial de Consumo:</strong> {InfoPatientState?.historyConsumption}</p>
                    <p className="card-text"><strong>Historial de Enfermedades:</strong> {InfoPatientState?.historyDiseases}</p>
                    <p className="card-text"><strong>Historial Familiar:</strong> {InfoPatientState?.histoyFamily}</p>

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