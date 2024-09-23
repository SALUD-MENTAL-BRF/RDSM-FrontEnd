import { FC } from "react"
import styles from '../../../assets/style/admin/Content/Hospitals.module.css'
import { PlusCircle, List } from 'lucide-react'

export const Hospitals:FC = () => {
  return (
    <main className="flex-grow p-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold text-secondary">Hospitales</h2>
        <input className="form-control w-25" type="search" placeholder="Buscar..." />
      </header>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Crear Hospital</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">Añade un nuevo hospital al sistema</p>
              <button className={`btn btn-primary w-100 ${styles.customPurple}`}>
                <PlusCircle className="me-2" size={16} />
                Crear
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Listar Hospitales</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">Ver todos los hospitales registrados</p>
              <button className={`btn btn-primary w-100 ${styles.customPurple}`}>
                <List className="me-2" size={16} />
                Listar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
