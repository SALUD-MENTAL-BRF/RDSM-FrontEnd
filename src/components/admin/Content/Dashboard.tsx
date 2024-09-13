import React from 'react';
import '../../../assets/style/admin/Content/Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content'>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Hospitales</h1>
            <form className='search-form'>
              <input
                type='search'
                className='form-control'
                placeholder='Buscar...'
              />
            </form>
          </div>

          <div className='row row-cols-1 row-cols-md-2 g-4'>
            <div className='col'>
              <div className='card h-100 text-center p-4'>
                <div className='card-body'>
                  <i className='bi bi-plus-circle card-icon mb-3'></i>
                  <h5 className='card-title'>Crear Hospital</h5>
                  <p className='card-text'>
                    Añade un nuevo hospital al sistema
                  </p>
                  <a href='#' className='btn btn-primary'>
                    Crear
                  </a>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='card h-100 text-center p-4'>
                <div className='card-body'>
                  <i className='bi bi-list-ul card-icon mb-3'></i>
                  <h5 className='card-title'>Listar Hospitales</h5>
                  <p className='card-text'>
                    Ver todos los hospitales registrados
                  </p>
                  <a href='#' className='btn btn-primary'>
                    Listar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
