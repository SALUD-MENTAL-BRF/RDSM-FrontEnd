import React,{useState} from "react";
import { formPatientDto } from "../../../types/patients.dto";
export const FormPatient = () => {
    const [formData, setFormData] = useState<formPatientDto>({
        fullName: '',
        date_birth: '',
        genre: '',
        address: '',
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
        histoyFamily: ''
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        // console.log(formData);
      };
    return(
        <main className="container mt-5 mb-5">
        <h2 className="mb-4">Formulario de Salud Mental</h2>
        <form onSubmit={() => handleSubmit}>
          <div className="card mb-4">
            <div className="card-header">
              1. Datos personales
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="nombreCompleto" className="form-label">Nombre completo</label>
                <input type="text" className="form-control" id="nombreCompleto" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edad" className="form-label">Edad</label>
                <input type="date" className="form-control" id="edad" name="date_birth" value={formData.date_birth} onChange={handleChange} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="genero" className="form-label">Género</label>
                <select className="form-select" id="genero" name="genre" value={formData.genre} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="estadoCivil" className="form-label">Estado civil</label>
                <select className="form-select" id="estadoCivil" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="divorciado">Divorciado/a</option>
                  <option value="viudo">Viudo/a</option>
                </select>
              </div> */}
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input type="text" className="form-control" id="direccion" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono de contacto</label>
                <input type="tel" className="form-control" id="telefono" name="telephone" value={formData.telephone} onChange={handleChange} required />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div> */}
            </div>
          </div>
  
          <div className="card mb-4">
            <div className="card-header">
              2. Información de contacto de emergencia
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="contactoEmergenciaNombre" className="form-label">Nombre de contacto de emergencia</label>
                <input type="text" className="form-control" id="contactoEmergenciaNombre" name="contactEmergencyName" value={formData.contactEmergencyName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="contactoEmergenciaRelacion" className="form-label">Relación con el paciente</label>
                <input type="text" className="form-control" id="contactoEmergenciaRelacion" name="contactEmergencyRelation" value={formData.contactEmergencyRelation} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="contactoEmergenciaTelefono" className="form-label">Número de teléfono de emergencia</label>
                <input type="tel" className="form-control" id="contactoEmergenciaTelefono" name="contactEmergencyTelephone" value={formData.contactEmergencyTelephone} onChange={handleChange} required />
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
                  <option value="ansiedad">Ansiedad</option>
                  <option value="depresion">Depresión</option>
                  <option value="estres">Neurodesarrollo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcionProblema" className="form-label">Descripción breve del problema actual</label>
                <textarea className="form-control" id="descripcionProblema" name="descriptionProblem" value={formData.descriptionProblem} onChange={handleChange} required></textarea>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="duracionProblema" className="form-label">Duración del problema</label>
                <input type="text" className="form-control" id="duracionProblema" name="duracionProblema" value={formData.duracionProblema} onChange={handleChange} required />
              </div> */}
              {/* <div className="mb-3">
                <label htmlFor="factoresDesencadenantes" className="form-label">Factores desencadenantes</label>
                <textarea className="form-control" id="factoresDesencadenantes" name="factoresDesencadenantes" value={formData.factoresDesencadenantes} onChange={handleChange} required></textarea>
              </div> */}
            </div>
          </div>
  
          <div className="card mb-4">
            <div className="card-header">
              4. Antecedentes médicos y de salud mental
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="diagnosticosPrevios" className="form-label">Diagnósticos previos de salud mental</label>
                <textarea className="form-control" id="diagnosticosPrevios" name="diagnosesPrevious" value={formData.diagnosesPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tratamientosAnteriores" className="form-label">Tratamientos anteriores (terapia, medicación)</label>
                <textarea className="form-control" id="tratamientosAnteriores" name="treatmentsPrevious" value={formData.treatmentsPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="hospitalizacionesPrevias" className="form-label">Hospitalizaciones previas</label>
                <textarea className="form-control" id="hospitalizacionesPrevias" name="hospitalizationsPrevious" value={formData.hospitalizationsPrevious} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="medicacionActual" className="form-label">Medicación actual (nombre, dosis)</label>
                <textarea className="form-control" id="medicacionActual" name="meciationCurrent" value={formData.meciationCurrent} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historialConsumo" className="form-label">Historial de consumo de sustancias (alcohol, tabaco, drogas)</label>
                <textarea className="form-control" id="historialConsumo" name="historyConsumption" value={formData.historyConsumption} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historialEnfermedades" className="form-label">Historial de enfermedades físicas (condiciones crónicas, alergias, etc.)</label>
                <textarea className="form-control" id="historialEnfermedades" name="historyDiseases" value={formData.historyDiseases} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="historiaFamiliar" className="form-label">Historia familiar de problemas de salud mental</label>
                <textarea className="form-control" id="historiaFamiliar" name="historiaFamiliar" value={formData.histoyFamily} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
  
          <button type="submit" className="btn btn-primary">Enviar formulario</button>
        </form>
      </main>
    )
}