'use client'

import { FC, useState } from "react"
import styles from '../../../assets/style/admin/Content/Hospitals.module.css'
import { PlusCircle, List } from 'lucide-react'

export const Hospitals: FC = () => {
  const [showList, setShowList] = useState(false)

  return (
    <main className="flex-grow p-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold text-secondary">Hospitales</h2>
        <input className="form-control w-25" type="search" placeholder="Buscar..." />
      </header>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Crear Hospital</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">Añade un nuevo hospital al sistema</p>
              <button 
                className={`btn btn-primary w-100 ${styles.customPurple}`}
                onClick={() => setShowList(false)}
              >
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
              <button 
                className={`btn btn-primary w-100 ${styles.customPurple}`}
                onClick={() => setShowList(true)}
              >
                <List className="me-2" size={16} />
                Listar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showList ? (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Listado de Hospitales</h5>
          </div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Hospital A</li>
              <li className="list-group-item">Hospital B</li>
              <li className="list-group-item">Hospital C</li>
              {/* Agrega más hospitales aquí */}
            </ul>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Crear Nuevo Hospital</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="hospitalName" className="form-label">Nombre del Hospital</label>
                <input type="text" className="form-control" id="hospitalName" placeholder="Ingrese el nombre del hospital" />
              </div>
              <div className="mb-3">
                <label htmlFor="hospitalAddress" className="form-label">Dirección</label>
                <input type="text" className="form-control" id="hospitalAddress" placeholder="Ingrese la dirección del hospital" />
              </div>
              <div className="mb-3">
                <label htmlFor="hospitalPhone" className="form-label">Teléfono</label>
                <input type="tel" className="form-control" id="hospitalPhone" placeholder="Ingrese el teléfono del hospital" />
              </div>
              <button type="submit" className={`btn btn-primary ${styles.customPurple}`}>Guardar Hospital</button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}