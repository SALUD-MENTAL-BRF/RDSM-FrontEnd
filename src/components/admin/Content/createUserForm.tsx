import { useEffect, useState } from 'react';
import { RolesList, useFetchRoles } from '../../../hooks/useFetchRoles';
import { CustomFetch } from '../../../api/CustomFetch';
import Swal from 'sweetalert2';
import styles from '../../../assets/style/admin/Content/createUserForm.module.css';
import { User } from '../../../types/user.dto';

interface UserFormProps {
  onClose: () => void;
  user?: User;
  reloadPage: boolean;
  setReloadPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserForm: React.FC<UserFormProps> = ({ onClose, user,setReloadPage, reloadPage }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [roles, setRoles] = useState<RolesList[]>([]);
  const [selectedRole, setSelectedRole] = useState(user?.roleId.toString() || '');
  const [status, setStatus] = useState(user?.status || 'active');
  const [showPassword, setShowPassword] = useState(false)

  const { rolesList, error, loading } = useFetchRoles();

  useEffect(() => {
    if (rolesList.length > 0) {
      setRoles(rolesList);
    }
  }, [rolesList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let data: any = {
        username,
        email,
        password,
        roleId: parseInt(selectedRole),
        status
      };
      // if (!user) {
      //   data.password = password
      // }

      const url = user
        ? `${import.meta.env.VITE_API_URL}users/${user.id}`
        : `${import.meta.env.VITE_API_URL}users`;
      const method = user ? 'PUT' : 'POST';

      const response = await CustomFetch(url, method, data);

      if (response.success) {
        Swal.fire(
          user ? 'Usuario actualizado exitosamente!' : 'Usuario creado exitosamente!',
          '',
          'success'
        ).then(() => {
          setReloadPage(!reloadPage)
        });
        onClose();

      }
    } catch (err) {
      console.error('Error al procesar usuario:', err);
      Swal.fire('Error!', 'No se pudo procesar el usuario.', 'error');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

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
      {!user && (
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
            <div className={styles.inputPassword}>
              {
                !showPassword ? (
                  <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                ):
                <input
                type="text"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              }
              {
                !showPassword ? (
                  <i className="fa-solid fa-eye m-2" onClick={handleShowPassword} role='button'></i>
                ):
                <i className="fa-solid fa-eye-slash m-2" onClick={handleShowPassword} role='button'></i>
              }
            </div>
        </div>
      )}
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
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Estado</label>
        <select
          className="form-select"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">
          {user ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
};