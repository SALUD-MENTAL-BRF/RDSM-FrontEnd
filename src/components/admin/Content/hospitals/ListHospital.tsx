import { FC } from 'react';
import { useFetchHospitals } from '../../../../hooks/useFetchHospitals';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { CustomFetch } from '../../../../api/CustomFetch';
import Swal from 'sweetalert2';

interface Service {
  serviceId: number;
  service: {
    name: string;
  };
}

interface Specialty {
  specialtyId: number;
  specialty: {
    name: string;
  };
}

interface Hospital {
  id: number;
  name: string;
  type: string;
  address: string;
  director: string;
  telephone: string;
  email: string;
  website: string;
  openingHours: string;
  services: Service[];
  specialties: Specialty[];
}

export const ListHospital: FC = () => {
  const { hospitals, error, loading } = useFetchHospitals();

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  if (!hospitals || hospitals.length === 0) {
    return <p className="text-center">No se encontraron hospitales</p>;
  }

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

      if(result.isConfirmed){
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital/${id}`, 'DELETE');
        if(response.success) {
          Swal.fire('Hospital eliminado', 'El hospital ha sido eliminado correctamente','success');
          setTimeout(() => {
            window.location.reload();
          },1000)
        }
      }

    } catch (err) {
      if(err instanceof Error) {
        console.error('Error deleting hospital:', err.message);
      } else {
        console.error('Error deleting hospital:', err);
      }
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Listado de Hospitales</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {hospitals.map((hospital: Hospital) => (
          <div key={hospital.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{hospital.name}</h5>
                <span className={`badge ${styles.customPurple} mb-2`}>{hospital.type}</span>
                <p className="card-text">
                  <i className="fas fa-map-marker-alt me-2"></i>{hospital.address}
                </p>
                <p className="card-text">
                  <i className="fas fa-user me-2"></i>{hospital.director}
                </p>
                <p className="card-text">
                  <i className="fas fa-phone me-2"></i>{hospital.telephone}
                </p>
                <p className="card-text">
                  <i className="fas fa-envelope me-2"></i>{hospital.email}
                </p>
                <p className="card-text">
                  <i className="fas fa-globe me-2"></i>
                  <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a>
                </p>
                <p className="card-text">
                  <i className="fas fa-clock me-2"></i>{hospital.openingHours}
                </p>
                <div className="mt-3">
                  <h6 className="card-subtitle mb-2">Servicios:</h6>
                  <ul className="list-unstyled">
                    {hospital.services.map((service, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle me-2 text-success"></i>{service.service.name} 
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <h6 className="card-subtitle mb-2">Especialidades:</h6>
                  <ul className="list-unstyled">
                    {hospital.specialties.map((specialty, index) => (
                      <li key={index}>
                        <i className="fas fa-star me-2 text-warning"></i>{specialty.specialty.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <a href={`/admin/hospitals/edit/${hospital.id}`} className="btn btn-primary m-3">
                    Editar
                  </a>
                  <a className="btn btn-danger ml-2" onClick={() => handleDelete(hospital.id)}>
                    Eliminar
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};