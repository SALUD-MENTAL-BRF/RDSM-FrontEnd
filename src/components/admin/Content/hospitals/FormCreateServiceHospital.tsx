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

    if(!service) {
      Swal.fire('Error', 'Debes ingresar un nombre de servicio', 'error');
      return;
    }

    const data = {
      name: service,
    }

    try {

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}serviceHospital`, 'POST', data);

      if(response.success) {
        Swal.fire('Éxito!', 'El servicio ha sido agregado','success');
        setTimeout(() => {
          // window.location.reload();
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

  const handleDelete = async (id: string) => {
    try {

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}serviceHospital/${id}`, 'DELETE');
      if (response.success) {
        Swal.fire('Éxito!', 'El servicio ha sido eliminado','success');
        setTimeout(() => {
          // window.location.reload();
        }, 1000)
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        Swal.fire('Error', 'No se pudo eliminar el servicio', 'error');
      } else {
        console.error('An unexpected error occurred', err);
      }
    }
  }

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
          serviceHospital.map((service: serviceHospitalOptions) => (
            <div key={service.id}>
              <label htmlFor={service.id}>{service.name}</label>
              <button className='btn btn-danger m-2' onClick={() => handleDelete(service.id)}>Eliminar</button>
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
