import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from '../../../assets/style/admin/Content/User.module.css';
import { useFetchUser } from '../../../hooks/useFetchUsers';
import { User } from '../../../types/user.dto';
import { CustomFetch } from '../../../api/CustomFetch';
import { UserForm } from './createUserForm';

export const UserList = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
    const matchesSearchTerm =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearchTerm && (showInactive || user.status !== 'INACTIVO');
  });

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingUser(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}users/${userId}`, 'DELETE');

        if (response.success) {
          setUsersList(usersList.filter(user => user.id.toString() !== userId));
          Swal.fire('Usuario eliminado!', 'El usuario ha sido eliminado correctamente.','success');
        } else {
          Swal.fire('Error!', 'No se pudo eliminar el usuario.', 'error');
        }
      } catch (err) {
        console.error('Error eliminando usuario:', err);
        Swal.fire('Error!', 'Ocurrió un error al intentar eliminar el usuario.', 'error');
      }
    }
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
            aria-label="Buscar usuarios"
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
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditUser(user)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id.toString())}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h5>
                  <button type="button" className="btn-close" onClick={toggleModal} aria-label="Cerrar"></button>
                </div>
                <div className="modal-body">
                  <UserForm user={editingUser || undefined} onClose={toggleModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};