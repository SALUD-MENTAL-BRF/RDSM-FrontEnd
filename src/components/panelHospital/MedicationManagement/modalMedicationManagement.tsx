import { FC, useState } from "react"
import styles from '../../../assets/style/panelHospital/MedicationManagement.module.css'
import { X } from "lucide-react"
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/CustomFetch";
import useAuth from "../../../hooks/useAuth";

interface Props {
  toggleModal: () => void,
  setChanged: any
}

interface statusForm {
  name: string;
  description: string;
  type: string;
  quantity: number | null;
}

export const ModalMedicationManagement:FC<Props> = ({ toggleModal, setChanged }) => {

  const [statusForm, setStatusForm] = useState<statusForm>({
    name: '',
    description: '',
    type: '',
    quantity: null,
  });

  const { authState } = useAuth();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStatusForm({
      ...statusForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      try {

        const data = {
          name: statusForm.name,
          description: statusForm.description,
          type: statusForm.type,
          quantity: Number(statusForm.quantity),
        }

        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital/medicines/${authState.token}`, 'POST', data);

        if (response.success) {
          Swal.fire('Medicina creada exitosamente!', 'La medicina ha sido creada correctamente.', 'success');
        }

      } catch (err) {
        const errorMessages = (err as Error).message.split(','); 
        const firstError = errorMessages[0].trim();
      
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el profesional',
          text: firstError,
        });
      } finally {
        setStatusForm({
          name: '',
          description: '',
          type: '',
          quantity: null,
        });
        toggleModal();
        setChanged((prev: boolean) => !prev);
      }
    } catch (err) {
      console.error('Error inesperado al crear profesional:', err);
    }
  }

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
              <input type="text" id="name" name="name" placeholder="Ej: Fluoxetina" onChange={handleChange}  value={statusForm.name} />
            </div>
            <div className={`${styles.inputName}`}>
              <label htmlFor="type">Categoría</label>
              <input type="text" id="type" name="type" placeholder="Ingrese una categoría de medicamento" onChange={handleChange} value={statusForm.type} />
            </div>
            <div className={`${styles.inputDescription}`}>
              <label htmlFor="description">Descripción</label>
              <textarea id="description" name="description" placeholder="Ingrese una descripción del medicamento" onChange={handleChange} value={statusForm.description || ''} />
            </div>
            <div className={`${styles.inputQuantity}`}>
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" id="quantity" name="quantity" placeholder="Ej: 100 unidades" onChange={handleChange} value={statusForm.quantity ?? ''} />
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.btnCancel} onClick={toggleModal}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnSubmit} onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}