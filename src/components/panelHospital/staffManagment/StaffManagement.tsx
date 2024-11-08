import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import styles from '../../../assets/style/panelHospital/StaffManagement.module.css';
import { ModalStaffManagement } from "./modalStaffManagment";
export const StaffManagement: FC = () => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-auto" placeholder="Buscar personal..." />
        <button className={`btn ${styles.customBlueBackground}`} onClick={toggleModal}>
          <PlusCircle size={16} className={`me-2`} />Agregar Personal
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Unidad</th>
                <th>Turno</th>
                <th>Pacientes Asignados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Juan Pérez</td>
                <td>Psiquiatra</td>
                <td>Psiquiatría Aguda</td>
                <td>Mañana</td>
                <td>15</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><Trash2 size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
              <tr>
                <td>Lic. María Rodríguez</td>
                <td>Psicóloga</td>
                <td>Terapia Intensiva</td>
                <td>Tarde</td>
                <td>10</td>
                <td>
                  <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                  <button className="btn btn-sm btn-link"><Trash2 size={16} className={styles.customBlueText} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && ( <ModalStaffManagement toggleModal={toggleModal} /> )}
    </div>
  );
};
