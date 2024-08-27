import React from 'react'
import '../../assets/style/Home/Home.css'

export const Footer:React.FC = () => {
  return (
    <footer className="bg-teal-light py-4">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
          <p className="small text-teal-dark mb-0">© 2023 MentalAid. Todos los derechos reservados.</p>
        </div>
        <div className="col-md-6 text-center text-md-end">
          <a href="#" className="text-teal-dark small me-3">Términos de Servicio</a>
          <a href="#" className="text-teal-dark small">Política de Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
  )
}
