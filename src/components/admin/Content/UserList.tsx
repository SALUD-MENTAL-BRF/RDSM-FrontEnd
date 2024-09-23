import { useState, useEffect } from 'react';
import styles from '../../../assets/style/admin/Content/User.module.css';
import { useFetchUser } from '../../../hooks/useFetchUsers';
import { User } from '../../../types/user.dto';
import { CreateUserForm } from './createUserForm';

export const UserList = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { users, error, loading } = useFetchUser();

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  if (error) {
    return <div>Error cargando usuarios: {error.message}</div>;
  }

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  const filteredUsers = usersList.filter(user => {
    const matchesSearchTerm = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm && (showInactive || user.status !== 'inactive');
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={`container-fluid ${styles.adminUsersList}`}>
      <h1 className="mb-4">Gestionar Usuarios</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showInactiveUsers"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label className="form-check-label" htmlFor="showInactiveUsers">
              Mostrar usuarios inactivos
            </label>
          </div>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success" onClick={toggleModal}>Agregar Usuario</button>
        </div>
      </div>
      {filteredUsers.length === 0 ? (
        <div>No se encontraron usuarios.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roleId}</td>
                  <td>{user.status}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Editar</button>
                    <button className="btn btn-sm btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{display: showModal ? 'block' : 'none'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Nuevo Usuario</h5>
              <button type="button" className="btn-close" onClick={toggleModal}></button>
            </div>
            <div className="modal-body">
              <CreateUserForm onClose={toggleModal} />
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};