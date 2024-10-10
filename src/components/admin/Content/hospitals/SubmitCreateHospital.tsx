import { FC } from 'react';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { CustomFetch } from '../../../../api/CustomFetch';
import Swal from 'sweetalert2';

interface SubmitCreateHospitalProps {
  stateForm: any;
  setStateForm: (newState: any) => void;
  setShowList: (setShowList: boolean) => void;
}

export const SubmitCreateHospital: FC<SubmitCreateHospitalProps> = ({ stateForm, setStateForm, setShowList }) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id: stateForm.id,
      name: stateForm.name,
      address: stateForm.address,
      telephone: stateForm.telephone,
      email: stateForm.email,
      website: stateForm.website,
      director: stateForm.director,
      openingHours: stateForm.openingHours,
      type: stateForm.type,
      specialties: stateForm.specialties,
      services: stateForm.services,
      userId: stateForm.userId
    }

    try {

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital`, 'POST', data);
      if (response.success) {
        Swal.fire({
          title: 'Hospital guardado correctamente',
          icon:'success',
        })
      }
    } catch (err) {
      if(err instanceof Error) {
        console.error('Error:', err.message);
      } else {
        console.error('error inesperado:', err);
      }
    } finally {
      setShowList(true);
      setStateForm({
        id: 0,
        name: '',
        address: '',
        telephone: '',
        email: '',
        website: '',
        director: '',
        openingHours: '',
        type: '',
        specialties: [],
        services: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className={`btn btn-primary ${styles.customPurple}`}
      >
        Guardar Hospital
      </button>
    </form>
  );
};
