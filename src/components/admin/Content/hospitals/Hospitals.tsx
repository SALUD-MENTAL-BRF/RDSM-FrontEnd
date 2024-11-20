import { FC, useState } from 'react';
import { ListHospital } from './ListHospital';
import { OptionsHospitals } from './OptionsHospitals';
import { FormCreateHospital } from './FormCreateHospital';

export const Hospitals: FC = () => {
  const [showList, setShowList] = useState(false);

  return (
    <main className='flex-grow p-4'>
      <header className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='h3 fw-bold text-secondary'>Hospitales</h2>
        <input
          className='form-control w-25'
          type='search'
          placeholder='Buscar...'
        />
      </header>

      <OptionsHospitals setShowList={setShowList}/>

      {showList ? (
        <ListHospital />
      ) : (
        <FormCreateHospital setShowList={setShowList}/>
      )}
    </main>
  );
};
