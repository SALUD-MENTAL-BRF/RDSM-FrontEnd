import { FC, useState } from 'react';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { serviceHospitalOptions } from '../../../../types/ServiceHospital.type';
import { CustomFetch } from '../../../../api/CustomFetch';
import Swal from 'sweetalert2';

interface FormCreateServiceHospitalProps {
  showServiceModal: boolean;
  closeServiceModal: () => void;
  setShowServiceModal: (setShowServiceModal: boolean) => void;
  serviceHospital: serviceHospitalOptions[];
}

export const FormCreateServiceHospital: FC<FormCreateServiceHospitalProps> = ({
  showServiceModal,
  closeServiceModal,
  setShowServiceModal,
  serviceHospital,
}) => {
  const [service, setService] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setService(e.target.value);
  };

  const onSubmitService = async (e: any) => {
    e.preventDefault();
    const data = {
      name: service,
    }

    try {

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}serviceHospital`, 'POST', data);

      if(response.success) {
        Swal.fire('Éxito!', 'El servicio ha sido agregado','success');
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      } else {
        console.error('Error al agregar el servicio:', response.error);
      }

    } catch (err) {
      if(err instanceof Error) {
        console.error('Error:', err.message);
      } else {
        console.error('Error:', err);
      }
    } finally {
      setShowServiceModal(false);
    }

  };

  if (!showServiceModal) return null;

  return (
    <div className={styles.modal} onClick={closeServiceModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={closeServiceModal}>
          &times;
        </span>
        <h2>Agregar Nuevo Servicio</h2>
        <input
          type='text'
          className='form-control'
          placeholder='Nombre del Servicio'
          onChange={onChange}
        />

        <div className={styles.divider}></div>

        {serviceHospital.length ? (
          serviceHospital.map((specialty: serviceHospitalOptions) => (
            <div key={specialty.id}>
              <label htmlFor={specialty.id}>{specialty.name}</label>
              <button className='btn btn-danger m-2'>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay especialidades registradas</p>
        )}

        <button className='btn btn-primary mt-3' onClick={onSubmitService}>
          Guardar Servicio
        </button>
      </div>
    </div>
  );
};
