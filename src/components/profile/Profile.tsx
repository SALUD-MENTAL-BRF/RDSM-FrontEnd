import React, { useState } from 'react';
import '../../assets/style/profile/profile.css';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="container-fluid profile-page">
      <main className="container pt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img src="./image-example/imageUser.jpg" alt="Foto de perfil" className="card-img-top rounded-circle mx-auto d-block mt-3" style={{width: '150px', height: '150px'}} />
              <div className="card-body text-center">
                <h5 className="card-title">Brian Cespedes Aguilera</h5>
                <p className="card-text">Usuario desde: Enero 2023</p>
              </div>
            </div>
            <div className="list-group mt-4">
              <button className={`list-group-item list-group-item-action ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>Perfil</button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'sesiones' ? 'active' : ''}`} onClick={() => setActiveTab('sesiones')}>Mis Sesiones</button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'recursos' ? 'active' : ''}`} onClick={() => setActiveTab('recursos')}>Recursos</button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'diario' ? 'active' : ''}`} onClick={() => setActiveTab('diario')}>Diario Personal</button>
            </div>
          </div>
          <div className="col-md-9">
            {activeTab === 'perfil' && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Mi Perfil</h3>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input type="text" className="form-control" id="nombre" value="Brian Cespedes Aguilera" readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" value="cespedes.aguilera.brian@gmail.com" readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">Teléfono</label>
                      <input type="tel" className="form-control" id="telefono" placeholder="+1 234 567 890" />
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
                  </form>
                </div>
              </div>
            )}
            {activeTab === 'sesiones' && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Mis Sesiones</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Profesional</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>15/06/2023</td>
                        <td>Dra. María López</td>
                        <td><span className="badge bg-success">Completada</span></td>
                      </tr>
                      <tr>
                        <td>22/06/2023</td>
                        <td>Dr. Juan Pérez</td>
                        <td><span className="badge bg-warning">Pendiente</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'recursos' && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Recursos</h3>
                  <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Guía de Meditación</h5>
                        <small>3 días atrás</small>
                      </div>
                      <p className="mb-1">Aprende técnicas de meditación para reducir el estrés.</p>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Ejercicios de Respiración</h5>
                        <small>1 semana atrás</small>
                      </div>
                      <p className="mb-1">Técnicas de respiración para la ansiedad.</p>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'diario' && (
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Diario Personal</h3>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="entradaDiario" className="form-label">Nueva Entrada</label>
                      <textarea className="form-control" id="entradaDiario" rows={5}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Entrada</button>
                  </form>
                  <hr />
                  <h5>Entradas Anteriores</h5>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">14/06/2023</h6>
                      <p className="card-text">Hoy me sentí mucho mejor después de mi sesión de terapia...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};