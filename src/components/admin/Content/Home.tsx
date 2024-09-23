import React from 'react'
import styles from '../../../assets/style/admin/Content/Home.module.css'

export const Home:React.FC = () => {
  return (
    <main className={`${styles.mainContent} container-fluid p-4`}>
      <div className="row mb-4">
        <div className="col d-flex justify-content-between align-items-center">
          <h2 className="h3 mb-0">Bienvenido, Administrador</h2>
          <div>
            <button className="btn btn-link p-0 me-3">
              <i className="bi bi-bell"></i>
            </button>
            <button className="btn btn-link p-0">
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {[
          { title: 'Total Hospitales', value: '24', change: '+2 desde el último mes', icon: 'hospital' },
          { title: 'Usuarios Activos', value: '1,234', change: '+10% desde la semana pasada', icon: 'people' },
          { title: 'Contenido Creado', value: '156', change: '+23 nuevos artículos este mes', icon: 'file-text' },
          { title: 'Tasa de Compromiso', value: '58.2%', change: '+5.4% desde el mes pasado', icon: 'bar-chart' }
        ].map((item, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle mb-2 text-muted">{item.title}</h6>
                    <h2 className="card-title mb-0">{item.value}</h2>
                  </div>
                  <i className={`bi bi-${item.icon} text-muted`}></i>
                </div>
                <p className="card-text"><small className="text-muted">{item.change}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Agregar Nuevo Hospital
                </button>
                <button className="btn btn-primary">
                  <i className="bi bi-people me-2"></i>
                  Gestionar Usuarios
                </button>
                <button className="btn btn-primary">
                  <i className="bi bi-file-text me-2"></i>
                  Crear Nuevo Contenido
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Actividad Reciente</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {[
                  { color: 'success', text: 'Nuevo hospital registrado: Hospital San Juan', time: 'Hace 2h' },
                  { color: 'primary', text: 'Actualización de perfil: Dr. María González', time: 'Hace 4h' },
                  { color: 'warning', text: 'Nuevo artículo publicado: "Manejo del estrés"', time: 'Hace 6h' }
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <span className={`${styles.activityDot} bg-${item.color} me-2`}></span>
                    <span className="flex-grow-1">{item.text}</span>
                    <small className="text-muted">{item.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
