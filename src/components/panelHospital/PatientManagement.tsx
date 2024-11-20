import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import styles from '../../assets/style/panelHospital/PatientManagement.module.css'

const PatientManagement: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-auto" placeholder="Buscar pacientes..." />
        <button className={`btn ${styles.customBlueBackground}`}>
          <PlusCircle size={16} className="me-2" /> Agregar Paciente
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Diagnóstico Principal</th>
                <th>Terapeuta Asignado</th>
                <th>Última Consulta</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>María González</td>
                <td>Depresión Mayor</td>
                <td>Dr. Juan Pérez</td>
                <td>15/10/2024</td>
                <td className="text-success">Estable</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><Trash2 size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
              <tr>
                <td>Carlos Rodríguez</td>
                <td>Trastorno de Ansiedad</td>
                <td>Dra. Ana Gómez</td>
                <td>12/10/2024</td>
                <td className="text-warning">En Observación</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><Trash2 size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;