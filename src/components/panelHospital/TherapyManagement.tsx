import { FC } from "react"
import { Edit, PlusCircle, Trash2 } from "lucide-react"
import styles from  '../../assets/style/panelHospital/TherapyManagement.module.css'

export const TherapyManagement:FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-auto" placeholder="Buscar terapias..." />
        <button className={`btn ${styles.customBlueBackground}`}>
          <PlusCircle size={16} className="me-2" /> Agregar Terapia
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Tipo de Terapia</th>
                <th>Terapeuta</th>
                <th>Horario</th>
                <th>Capacidad</th>
                <th>Pacientes Inscritos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Terapia Cognitivo-Conductual</td>
                <td>Dra. Laura Martínez</td>
                <td>Lunes y Miércoles, 10:00 AM</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><Trash2 size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
              <tr>
                <td>Terapia de Grupo para Ansiedad</td>
                <td>Dr. Roberto Sánchez</td>
                <td>Martes y Jueves, 3:00 PM</td>
                <td>15</td>
                <td>12</td>
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
  )
}
