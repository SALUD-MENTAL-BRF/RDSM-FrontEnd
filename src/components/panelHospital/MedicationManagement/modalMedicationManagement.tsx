import { FC } from "react"
import styles from '../../../assets/style/panelHospital/MedicationManagement.module.css'
import { X } from "lucide-react"

interface Props {
  toggleModal: () => void,
}

export const ModalMedicationManagement:FC<Props> = ({ toggleModal }) => {

  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5>Agregar una nueva medicina</h5>
          <X size={20} onClick={toggleModal} className={styles.closeModal} />
        </div>
        <div className={styles.modalBody}>
          <form>
            <div className={`${styles.inputName}`}>
              <label htmlFor="name">Nombre del Medicamento</label>
              <input type="text" id="name" name="name" placeholder="Ej: Fluoxetina" />
            </div>
            <div className={`${styles.inputDescription}`}>
              <label htmlFor="description">Descripción</label>
              <textarea id="description" name="description" placeholder="Ingrese una descripción del medicamento"></textarea>
            </div>
            <div className={`${styles.inputQuantity}`}>
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" id="quantity" name="quantity" placeholder="Ej: 100 unidades" />
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.btnCancel} onClick={toggleModal}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnSubmit}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
