import { Eye, EyeOff, X } from 'lucide-react'
import styles from '../../../assets/style/panelHospital/StaffManagement.module.css'
import { FC, useEffect, useState } from 'react'
import { useFetchHospitalData } from '../../../hooks/useFetchHospitalData';
import Swal from 'sweetalert2';
import { CustomFetch } from '../../../api/CustomFetch';

interface Props {
  toggleModal: () => void,
  setChanged: any
}

interface StatusForm {
  username: string;
  email: string;
  password: string;
  roleId: number;
  title: string;
  firstname: string;
  lastname: string;
  specialization: string;
  tuition: number | null;
  birthdate: string;
  hospitalId: null | number;
  turnOfAttention: string | null;
}

export const ModalStaffManagement: FC<Props> = ({ toggleModal, setChanged }) => {

  const { hospitalData } = useFetchHospitalData();

  const [statusForm, setStatusForm] = useState<StatusForm>({
    username: '',
    email: '',
    password: '',
    roleId: parseInt(import.meta.env.VITE_ROLE_PROFESSIONAL, 10),
    title: '',
    firstname: '',
    lastname: '',
    specialization: '',
    tuition: null,
    birthdate: '',
    hospitalId: null,
    turnOfAttention: null,
  });

  useEffect(() => {
    if (hospitalData?.hospital?.hospital?.id) {
      setStatusForm((prevState) => ({
        ...prevState,
        hospitalId: hospitalData.hospital.hospital.id,
      }));
    }
  }, [hospitalData]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatusForm({
      ...statusForm,
      [name]: value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      try {
        const data = {
          username: statusForm.username,
          password: statusForm.password,
          email: statusForm.email,
          firstname: statusForm.firstname,
          lastname: statusForm.lastname,
          title: statusForm.title,
          specialization: statusForm.specialization,
          tuition: Number(statusForm.tuition),
          birthdate: statusForm.birthdate,
          roleId: statusForm.roleId,
          hospitalId: statusForm.hospitalId,
          turnOfAttention: statusForm.turnOfAttention,
        }
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}professional`, 'POST', data);
        if (response.success) {
          Swal.fire('Profesional creado exitosamente!', 'El profesional ha sido creado correctamente.', 'success');
          toggleModal();
          setChanged((prev: boolean) => !prev);
        }
      } catch (err: any) {
        const errorMessages = (err as Error).message.split(','); 
        const firstError = errorMessages[0].trim();
      
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el profesional',
          text: firstError,
        });
      }
      
    } catch (err) {
      console.error('Error inesperado al crear profesional:', err);
    }

  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5>Crear Nuevo Profesional</h5>
          <X size={20} onClick={toggleModal} className={styles.closeModal} />
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formgroup}>
              <div className={styles.input}>
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={statusForm.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="password">Contraseña</label>
                <div className={styles.inputPassword}>
                  {
                    !showPassword ? (
                      <input
                      type="password"
                      id="password"
                      name="password"
                      value={statusForm.password}
                      onChange={handleChange}
                    />
                    ):
                    <input
                    type="text"
                    id="password"
                    name="password"
                    value={statusForm.password}
                    onChange={handleChange}
                  />  
                  }
                  {
                    !showPassword ? (
                      <Eye size={20} className={`${styles.eye}`} onClick={handleShowPassword} role='button'></Eye>
                    ):
                      <EyeOff size={20} className={`${styles.eye}`} onClick={handleShowPassword} role='button'></EyeOff>
                  }
                </div>
              </div>
            </div>
            <div className={styles.formgroupemail}>
              <div className={styles.inputemail}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={statusForm.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formgroup}>
              <div className={styles.input}>
                <label htmlFor="firstname">Nombre</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={statusForm.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={statusForm.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formgroup}>
              <div className={styles.input}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={statusForm.title}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="specialization">Especialidad</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={statusForm.specialization}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formgroup}>
              <div className={styles.input}>
                <label htmlFor="tuition">Matrícula</label>
                <input
                  type="number"
                  id="tuition"
                  name="tuition"
                  value={statusForm.tuition || ''}
                  min={0}
                  
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="birthdate">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={statusForm.birthdate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formgroup}>
              <div className={styles.input}>
                <label htmlFor="turnOfAttention">Turno de Atención</label>
                <input
                  type="text"
                  id="turnOfAttention"
                  name="turnOfAttention"
                  value={statusForm.turnOfAttention || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.btnCancel} onClick={toggleModal}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnSubmit}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
