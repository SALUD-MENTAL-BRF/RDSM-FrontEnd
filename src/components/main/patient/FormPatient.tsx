import React,{useState,useEffect} from "react";
import { formPatientDto } from "../../../types/patients.dto";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/CustomFetch";
import { ProvinceDto } from "../../../types/privinces.dto";
import { localityDto } from "../../../types/locality.dto";
import { disorderDto } from "../../../types/disorder.dto";

export const FormPatient = () => {
    const [formData, setFormData] = useState<formPatientDto>({
        fullName: '',
        date_birth: '',
        genre: '',
        telephone: '',
        contactEmergencyName: '',
        contactEmergencyRelation: '',
        contactEmergencyTelephone: '',
        reasonConsultation: '',
        descriptionProblem: '',
        diagnosesPrevious: '',
        treatmentsPrevious: '',
        hospitalizationsPrevious: '',
        meciationCurrent: '',
        historyConsumption: '',
        historyDiseases: '',
        histoyFamily: '',
        localityId: null,
        neighborhood: "",
        streetNumber: ""
      });
      const navigate = useNavigate()
      const {id, userId} = useParams()
      const [prefijo, _setPrefijo] = useState<string>("+54")
      const [stateProvinces, setStateProvinces] = useState<Array<ProvinceDto>>()
      const [stateLocality, setStateLocality] = useState<Array<localityDto>>()
      const [disorderState,setDisorderState] = useState<Array<disorderDto>>([])
      const [patientState,setPatientState] = useState(false);
      const [adresState,setAdressState  ] = useState({
        province: "",
        locality: ""
      });
      const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));

        if (name == "province"){
          if (value == "0"){
            setStateLocality([])
          } 
          if (value != "0"){
            await findlocality(Number(value))
          }
        }
        
      };
    
      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}request-patient/${userId}/${id}`,{
          method: "POST",
          body: JSON.stringify({...formData,telephone: prefijo + formData.telephone, 
            contactEmergencyTelephone: prefijo + formData.contactEmergencyTelephone
          }),
          headers: {
            'content-type':'application/json'
          }
        })
        if(response.status == 200){
          return Swal.fire({
            title: "Enviado",
            text: "Solicitud enviada.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          }).then(() => {
            return navigate("/home")
          })
        }

        const data = await response.json()
        
        if(data.statusCode == 400){
          return Swal.fire({
            title: "Error",
            text: data.message[0],
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ok",
          })
        }
      };

      useEffect(() => {
        (
          async () => {
            const provinces = await CustomFetch(`${import.meta.env.VITE_API_URL}province`, 'GET')
            const disorder = await CustomFetch(`${import.meta.env.VITE_API_URL}disorder`, 'GET');
            const patient = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/user/${userId}`, 'GET')
            if(patient){
              setPatientState(true)
              
              setFormData(prevState => ({
                ...prevState,
                fullName: patient.fullName,
                date_birth: patient.date_birth,
                genre: patient.genre,
                telephone: patient.telephone,
                contactEmergencyName: patient.contactEmergencyName,
                contactEmergencyRelation: patient.contactEmergencyRelation,
                contactEmergencyTelephone: patient.contactEmergencyTelephone,
                neighborhood: patient.neighborhood,
                streetNumber: patient.streetNumber,
                localityId: patient.locality.id
              })
              )
              setAdressState({
                locality: patient.locality.name,
                province: patient.locality.province.name
              })
            }
            setDisorderState(disorder);
            setStateProvinces(provinces)
            
          }
        )()
      },[])

      const findlocality = async (provinceId:number) => {
          const localities = await CustomFetch(`${import.meta.env.VITE_API_URL}locality/${provinceId}`, 'GET')
          setStateLocality(localities)
      }
    return(
        <main className="container mt-5 mb-5">
        <h2 className="mb-4">Formulario de Salud Mental</h2>
        <form>
          <div className="card mb-4">
            <div className="card-header">
              1. Datos personales
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="nombreCompleto" className="form-label">Nombre completo</label>
                <input disabled={patientState ? true : false} type="text" className="form-control" id="nombreCompleto" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edad" className="form-label">Fecha de nacimiento</label>
                <input disabled={patientState ? true : false} type="date" className="form-control" id="edad" name="date_birth" value={formData.date_birth} onChange={handleChange} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="genero" className="form-label">Género</label>
                <select disabled={patientState ? true : false} className="form-select" id="genero" name="genre" value={formData.genre} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <div>
                    <select disabled={patientState ? true : false} onChange={handleChange} className="selects-formPatient w-50" name="province" id="">
                      <option value="0">{patientState ? adresState.province : "Selecciona una provincia..."}</option>
                      {
                        stateProvinces?.map((province) => (
                          <option key={province.id} value={province.id}>{province.name}</option>
                        ))
                      }
                    </select>
                    
                    <select disabled={patientState ? true : false} onChange={handleChange} className="selects-formPatient w-50" name="localityId" id="">
                        <option value="0" >{patientState ? adresState.locality : "Selecciona una localidad..."}</option>
                        {
                          stateLocality?.map((locality) => (
                            <option key={locality.id} value={locality.id}>{locality.name}</option>
                          ))
                        }
                    </select>
                  </div>
                <div className="d-flex">
                  <input disabled={patientState ? true : false} placeholder="Colonia o barrio" type="text" className="form-control" id="direccion" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                  <input disabled={patientState ? true : false} placeholder="Calle y número (o apartamento)" type="text" className="form-control" id="direccion" name="streetNumber" value={formData.streetNumber} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono de contacto</label>
                {
                  !patientState ? 
                    <div className="d-flex">
                      <p className="mt-3 me-2">{prefijo}</p>
                      <input type="number" className="form-control" id="telefono" name="telephone" value={formData.telephone} onChange={handleChange} required />

                    </div>
                  :
                    <div className="d-flex">
                      <input disabled type="text" className="form-control" id="telefono" name="telephone" value={formData.telephone} onChange={handleChange} required />

                    </div>
                }
              </div>
            </div>
          </div>
  
          <div className="card mb-4">
            <div className="card-header">
              2. Información de contacto de emergencia
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="contactoEmergenciaNombre" className="form-label">Nombre de contacto de emergencia</label>
                <input disabled={patientState ? true : false} type="text" className="form-control" id="contactoEmergenciaNombre" name="contactEmergencyName" value={formData.contactEmergencyName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="contactoEmergenciaRelacion" className="form-label">Relación con el paciente</label>
                <input disabled={patientState ? true : false} type="text" className="form-control" id="contactoEmergenciaRelacion" name="contactEmergencyRelation" value={formData.contactEmergencyRelation} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="contactoEmergenciaTelefono" className="form-label">Número de teléfono de emergencia</label>
                {
                  patientState ? 
                  <div className="d-flex">
                    <input disabled type="text" className="form-control" id="contactoEmergenciaTelefono" name="contactEmergencyTelephone" value={formData.contactEmergencyTelephone} onChange={handleChange} required />
                  </div>
                  :
                  <div className="d-flex">
                    <p className="mt-3 me-2">{prefijo}</p> 
                    <input type="number" className="form-control" id="contactoEmergenciaTelefono" name="contactEmergencyTelephone" value={formData.contactEmergencyTelephone} onChange={handleChange} required />
                  </div>
                }
               
              </div>
            </div>
          </div>
  
          <div className="card mb-4">
            <div className="card-header">
              3. Motivo de consulta
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="motivoConsulta" className="form-label">Razón principal para buscar ayuda</label>
                <select className="form-select" id="motivoConsulta" name="reasonConsultation" value={formData.reasonConsultation} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  {
                    disorderState.map((value) => (
                      <option key={value.id} value={value.type}>{value.type}</option>
                    ))
                  }
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcionProblema" className="form-label">Descripción breve del problema actual</label>
                <textarea style={{textTransform: 'none'}} className="form-control" id="descripcionProblema" name="descriptionProblem" value={formData.descriptionProblem} onChange={handleChange} required></textarea>
              </div>
            </div>
          </div>
  
          <div className="card mb-4">
            <div className="card-header">
              4. Antecedentes médicos y de salud mental
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="diagnosticosPrevios" className="form-label">Diagnósticos previos de salud mental</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="diagnosticosPrevios" name="diagnosesPrevious" value={formData.diagnosesPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tratamientosAnteriores" className="form-label">Tratamientos anteriores (terapia, medicación)</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="tratamientosAnteriores" name="treatmentsPrevious" value={formData.treatmentsPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="hospitalizacionesPrevias" className="form-label">Hospitalizaciones previas</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="hospitalizacionesPrevias" name="hospitalizationsPrevious" value={formData.hospitalizationsPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="medicacionActual" className="form-label">Medicación actual (nombre, dosis)</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="medicacionActual" name="meciationCurrent" value={formData.meciationCurrent} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historialConsumo" className="form-label">Historial de consumo de sustancias (alcohol, tabaco, drogas)</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="historialConsumo" name="historyConsumption" value={formData.historyConsumption} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historialEnfermedades" className="form-label">Historial de enfermedades físicas (condiciones crónicas, alergias, etc.)</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="historialEnfermedades" name="historyDiseases" value={formData.historyDiseases} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historiaFamiliar" className="form-label">Historia familiar de problemas de salud mental</label>
                <textarea style={{textTransform: 'none'}}  className="form-control" id="historiaFamiliar" name="histoyFamily" value={formData.histoyFamily} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
                <div className="text-center">
                    <button onClick={handleSubmit} type="button" className="text-center btn btn-primary">Enviar formulario</button>
                    <button onClick={() => navigate(`/profile-professional/${id}`)} type="button" className="text-center btn btn-danger ms-2">Cancelar</button>
                </div>
        </form>
      </main>
    )
}