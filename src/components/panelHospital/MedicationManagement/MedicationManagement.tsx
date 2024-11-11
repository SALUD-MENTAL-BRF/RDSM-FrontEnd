import { Edit, PlusCircle } from "lucide-react"
import { FC, useState } from "react"
import styles from '../../../assets/style/panelHospital/MedicationManagement.module.css'
import { ModalMedicationManagement } from "./modalMedicationManagement"

export const MedicationManagement:FC = () => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-auto" placeholder="Buscar medicamentos..." />
        <button className={`btn ${styles.customBlueBackground}`} onClick={toggleModal}>
          <PlusCircle size={16} className="me-2" /> Agregar Medicamento
        </button>
      </div>
      <div className="card">
        
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre del Medicamento</th>
                <th>Tipo</th>
                <th>Stock Actual</th>
                <th>Nivel Crítico</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fluoxetina</td>
                <td>Antidepresivo</td>
                <td>500</td>
                <td>100</td>
                <td className="text-success">Suficiente</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><PlusCircle size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
              <tr>
                <td>Alprazolam</td>
                <td>Ansiolítico</td>
                <td>50</td>
                <td>100</td>
                <td className="text-danger">Bajo</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><PlusCircle size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {
        showModal && <ModalMedicationManagement toggleModal={toggleModal} />
      }
    </div>
  )
}
