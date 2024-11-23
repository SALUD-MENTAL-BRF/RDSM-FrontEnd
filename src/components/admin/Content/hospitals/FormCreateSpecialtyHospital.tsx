import { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { specialityHospitalOptions } from "../../../../types/SpecialtyHospitals.type";
import { CustomFetch } from '../../../../api/CustomFetch';
import Swal from 'sweetalert2';
import { useFetchSpecialityHospital } from '../../../../hooks/useFetchSpecialityHospital';

interface FormCreateSpecialtyHospitalProps {
  showSpecialtyModal: boolean;
  closeSpecialtyModal: () => void;
  setShowSpecialtyModal: Dispatch<SetStateAction<boolean>>;
  specialityHospital: specialityHospitalOptions[];
}


export const FormCreateSpecialtyHospital: FC<FormCreateSpecialtyHospitalProps> = ({
  closeSpecialtyModal,
  showSpecialtyModal,
  setShowSpecialtyModal,
  specialityHospital,
}) => {

  const [speciality, setSpeciality] = useState('');
  const [specialityState, setSpecialityState] =  useState<specialityHospitalOptions[]>()
  const [reloadPage, serReloadPage] = useState<boolean>(false)
  
  const handleSubmitSpecialty = async (e: any) => {
    e.preventDefault();

    if(!speciality) {
      Swal.fire('Error!', 'Debes ingresar un nombre de especialidad', 'error');
      return;
    }
    
    const data = {
      name: speciality,
    }

    try {

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}specialityHospital`, 'POST', data);
      if(response.success) {
        Swal.fire('Éxito!', 'La especialidad ha sido agregada','success');
        setTimeout(() => {
          // window.location.reload();
        }, 1000)
      } else {
        Swal.fire('Error!', 'Hubo un error al agregar la especialidad', 'error');
      }
    } catch (err) {
      if(err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unexpected error occurred', err);
        return;
      }
    } finally {
      setSpeciality('');
      setShowSpecialtyModal(false)
    }
  };

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeciality(e.target.value);
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
      
      if (result.isConfirmed) {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}specialityHospital/${id}`, 'DELETE');
        if(response.success) {
          Swal.fire('Éxito!', 'La especialidad ha sido eliminada','success');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000)
        }
      }
    }  catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        Swal.fire('Error', 'No se pudo eliminar la especialidad', 'error');
      } else {
        console.error('An unexpected error occurred', err);
      }
    }
  }
  
  return showSpecialtyModal ? (
    <div className={styles.modal} onClick={closeSpecialtyModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={closeSpecialtyModal}>&times;</span>
        <h2>Agregar Nueva Especialidad</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la Especialidad"
          onChange={handleSpecialityChange}
        />
  
        <div className={styles.divider}></div>
  
        {specialityHospital.length ? (
          specialityHospital.map((specialty: specialityHospitalOptions) => (
            <div key={specialty.id}>  
              <label htmlFor={specialty.id.toString()}>{specialty.name}</label>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleDelete(specialty.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay especialidades registradas</p>
        )}
  
        <button className="btn btn-primary mt-3" onClick={handleSubmitSpecialty}>
          Guardar Especialidad
        </button>
      </div>
    </div>
  ) : null;
  };