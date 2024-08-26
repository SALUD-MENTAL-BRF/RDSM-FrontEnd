import '../assets/style/Home/Home.css'; // Asegúrate de crear este archivo para los estilos personalizados

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="./logo/logoNuevo.jpeg" alt="logo de MentalAid" className='logoMentalAid' />
          </a>
          <nav className="navbar-nav ms-auto">
            <a className="nav-link text-teal" href="#servicios">Servicios</a>
            <a className="nav-link text-teal" href="#como-funciona">Cómo Funciona</a>
            <a className="nav-link text-teal" href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero bg-teal-light py-5">
          <div className="container text-center">
            <h1 className="display-4 fw-bold text-teal mb-4">Cuidamos tu salud mental, estés donde estés</h1>
            <p className="lead text-teal-dark mb-4">
              Conectamos pacientes con profesionales de salud mental de manera remota, facilitando el acceso a la atención que necesitas.
            </p>
            <div>
              <button className="btn btn-teal btn-lg me-2">Comenzar Ahora</button>
              <button className="btn btn-outline-teal btn-lg">Saber Más</button>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-5">
          <div className="container">
            <h2 className="text-center text-teal mb-5">Nuestros Servicios</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal mb-3"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                  <h3 className="h5 text-teal">Consultas en Línea</h3>
                  <p className="text-teal-dark">Sesiones privadas y seguras con profesionales calificados desde la comodidad de tu hogar.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal mb-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                  <h3 className="h5 text-teal">Privacidad Garantizada</h3>
                  <p className="text-teal-dark">Tu información y sesiones están protegidas con la más alta seguridad y confidencialidad.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal mb-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <h3 className="h5 text-teal">Apoyo Continuo</h3>
                  <p className="text-teal-dark">Acceso a recursos y seguimiento personalizado para tu bienestar mental.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-teal-light py-5">
          <div className="container">
            <h2 className="text-center text-teal mb-5">Cómo Funciona</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="bg-white p-4 rounded shadow text-center h-100">
                  <div className="display-4 fw-bold text-teal mb-3">1</div>
                  <h3 className="h5 text-teal">Regístrate</h3>
                  <p className="text-teal-dark">Crea tu cuenta y completa un breve cuestionario sobre tus necesidades.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-white p-4 rounded shadow text-center h-100">
                  <div className="display-4 fw-bold text-teal mb-3">2</div>
                  <h3 className="h5 text-teal">Elige un Profesional</h3>
                  <p className="text-teal-dark">Selecciona el profesional que mejor se adapte a tus necesidades y horarios.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-white p-4 rounded shadow text-center h-100">
                  <div className="display-4 fw-bold text-teal mb-3">3</div>
                  <h3 className="h5 text-teal">Inicia tu Terapia</h3>
                  <p className="text-teal-dark">Conéctate a tus sesiones en línea y comienza tu camino hacia el bienestar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-5">
          <div className="container">
            <div className="text-center">
              <h2 className="text-teal mb-4">¿Listo para comenzar?</h2>
              <p className="lead text-teal-dark mb-4">
                Déjanos tus datos y nos pondremos en contacto contigo para ayudarte a dar el primer paso.
              </p>
              <form className="mx-auto formularioLanding">
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Tu nombre" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Tu correo electrónico" />
                </div>
                <button type="submit" className="btn btn-teal btn-lg w-100">Solicitar Información</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-teal-light py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="small text-teal-dark mb-0">© 2023 MenteSana. Todos los derechos reservados.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-teal-dark small me-3">Términos de Servicio</a>
              <a href="#" className="text-teal-dark small">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}