import { List, PlusCircle } from 'lucide-react';
import { FC } from 'react';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';

interface OptionsHospitalsProps {
  setShowList: (showList: boolean) => void;
}

export const OptionsHospitals: FC<OptionsHospitalsProps> = ({setShowList}) => {
  return (
    <div className='row g-4 mb-4'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title mb-0'>Crear Hospital</h5>
          </div>
          <div className='card-body'>
            <p className='text-muted mb-3'>
              Añade un nuevo hospital al sistema
            </p>
            <button
              className={`btn btn-primary w-100 ${styles.customPurple}`}
              onClick={() => setShowList(false)}
            >
              <PlusCircle className='me-2' size={16} />
              Crear
            </button>
          </div>
        </div>
      </div>

      <div className='col-md-6'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title mb-0'>Listar Hospitales</h5>
          </div>
          <div className='card-body'>
            <p className='text-muted mb-3'>
              Ver todos los hospitales registrados
            </p>
            <button
              className={`btn btn-primary w-100 ${styles.customPurple}`}
              onClick={() => setShowList(true)}
            >
              <List className='me-2' size={16} />
              Listar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
