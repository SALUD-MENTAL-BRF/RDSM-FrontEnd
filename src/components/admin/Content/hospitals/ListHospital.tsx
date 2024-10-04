import { FC } from 'react';

export const ListHospital: FC = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Listado de Hospitales</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          <li className='list-group-item'>Hospital A</li>
          <li className='list-group-item'>Hospital B</li>
          <li className='list-group-item'>Hospital C</li>
        </ul>
      </div>
    </div>
  );
};
