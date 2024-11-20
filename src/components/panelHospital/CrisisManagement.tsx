import { CheckCircle, Edit } from "lucide-react"
import { FC } from "react"
import styles from '../../assets/style/panelHospital/CrisisManagement.module.css'

export const CrisisManagement:FC = () => {
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className={`card-header ${styles.cardHeader}`}>
              <h5 className="card-title mb-0">Alertas Activas</h5>
            </div>
            <div className="card-body">
              <p className="card-text h3">2</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className={`card-header ${styles.cardHeader}`}>
              <h5 className="card-title mb-0">Tiempo Promedio de Respuesta</h5>
            </div>
            <div className="card-body">
              <p className="card-text h3">8 min</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className={`card-header ${styles.cardHeader}`}>
              <h5 className="card-title mb-0">Estado de Preparación</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <CheckCircle size={24} className="text-success me-2" />
                <span className="h4 mb-0">Listo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Tipo de Crisis</th>
                <th>Hora de Inicio</th>
                <th>Asignado a</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Luis Gómez</td>
                <td>Episodio Psicótico</td>
                <td>10:30 AM</td>
                <td>Dr. Juan Pérez</td>
                <td className="text-warning">En Progreso</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><CheckCircle size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
              <tr>
                <td>Ana Martínez</td>
                <td>Intento de Suicidio</td>
                <td>11:15 AM</td>
                <td>Dra. Laura Sánchez</td>
                <td className="text-danger">Crítico</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><CheckCircle size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
