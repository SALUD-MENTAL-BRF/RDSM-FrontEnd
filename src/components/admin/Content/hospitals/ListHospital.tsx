import { FC } from 'react';
import { useFetchHospitals } from '../../../../hooks/useFetchHospitals';

export const ListHospital: FC = () => {
  const { hospitals, error, loading } = useFetchHospitals();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!hospitals || hospitals.length === 0) {
    return <p>No se encontraron hospitales</p>;
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Listado de Hospitales</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {hospitals.map((hospital) => (
            <li key={hospital.id} className='list-group-item'>
              <h5>{hospital.name}</h5>
              <p>Dirección: {hospital.address}</p>
              <p>Director: {hospital.director}</p>
              <p>Teléfono: {hospital.telephone}</p>
              <p>Tipo: {hospital.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
