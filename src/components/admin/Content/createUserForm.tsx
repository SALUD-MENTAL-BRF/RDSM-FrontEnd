import { useEffect, useState } from 'react';
import { RolesList, useFetchRoles } from '../../../hooks/useFetchRoles';
import { CustomFetch } from '../../../api/CustomFetch';
import Swal from 'sweetalert2';
import styles from '../../../assets/style/admin/Content/createUserForm.module.css'

interface CreateUserFormProps {
  onClose: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<RolesList[]>([]);
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = {
        username,
        email,
        password,
        role_id: selectedRole,
      };

      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}users`, 'POST', data);

      if (response.success) {
        Swal.fire('Usuario creado exitosamente!', '', 'success');
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  };

  const { rolesList, error, loading } = useFetchRoles();

  useEffect(() => {
    if (rolesList.length > 0) {
      setRoles(rolesList);
    }
  }, [rolesList]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando roles: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${styles.emailInput}`}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Rol</label>
        <select
          className="form-select"
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          required
        >
          <option value="" disabled>Seleccionar rol</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id} className='text-dark'>
              {role.type}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Crear Usuario</button>
      </div>
    </form>
  );
};