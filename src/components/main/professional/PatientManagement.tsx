import { useNavigate } from "react-router-dom";
import styles from '../../../assets/style/professional/PatientList.module.css'
import { useEffect, useState } from "react";
import { formPatientDto } from "../../../types/patients.dto";
import useAuth from "../../../hooks/useAuth";
import { CustomFetch } from "../../../api/CustomFetch";
import { ProfessionalDto } from "../../../types/profileProfessional.dto";
import Swal from "sweetalert2";
import { ArrowLeft, Filter, Search, User, MoreHorizontal, UserCircle, BookOpen, MessageCircle, UserMinus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";

export const PatientManagement = () => {
  const [patientsState, setPatientState] = useState<Array<formPatientDto>>([]);
  const [professionalState, setProfessional] = useState<ProfessionalDto>();
  const [reloadPage, setReloadPage] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
      const professional = await CustomFetch(`${import.meta.env.VITE_API_URL}professional/user/${user.id}`, 'GET')
      const data = await CustomFetch(`${import.meta.env.VITE_API_URL}patient/professional/${professional.id}`, 'GET')
      setPatientState(data.patient)
      setProfessional(professional)
    })()
  }, [reloadPage]);

  const desvincular = (patientId: number) => {
    Swal.fire({
      text: '¿Seguro que quiere desvincularse del paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desvincular',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}professional/desvincular/${professionalState?.id}/${patientId}`, {
          method: 'DELETE'
        })
        if (response.status == 200) {
          setReloadPage(!reloadPage);
          Swal.fire(
            'Desvinculado',
            'El paciente ha sido desvinculado.',
            'success'
          )
        }
      }
    })
  };

  useBodyScrollLock(true)

  const filteredPatients = patientsState.filter(patient =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = (patientId: number) => {
    setActiveDropdown(activeDropdown === patientId ? null : patientId);
  };

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  return (
    <main className={styles.backgroundMain}>
      <div className={styles.head}>
        <motion.div
          className={styles.arrow}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/home')}
        >
          <ArrowLeft size={30} color="#43c1bb" />
        </motion.div>
        <div className={styles.title}>
          <h1>Gestionar Pacientes</h1>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <Search size={20} color="#43c1bb" />
          <input
            type="text"
            placeholder="Buscar paciente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Teléfono</th>
              <th>Telefono de Emergencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td>
                    <div className={styles.patientName}>
                      <User size={30} color="#14B8A6" />
                      <span>{patient.fullName}</span>
                    </div>
                  </td>
                  <td>{calculateAge(patient.date_birth)}</td>
                  <td>{patient.genre}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.contactEmergencyTelephone}</td>
                  <td>
                    <div className={styles.actionContainer}>
                      <div className={styles.moreActions} onClick={() => patient.id !== undefined && toggleDropdown(patient.id)}>
                        <MoreHorizontal size={20} color="#43c1bb" />
                      </div>
                      <AnimatePresence>
                        {activeDropdown === patient.id && patient.id !== undefined && (
                          <motion.div
                            className={styles.dropdown}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button className={styles.dropdownItem} onClick={() => navigate(`/information-patient/${patient.id}`)}>
                              <UserCircle size={16} />
                              Ver perfil
                            </button>
                            <button className={styles.dropdownItem} onClick={() => navigate(`/management-activities/${patient.id}`)}>
                              <BookOpen size={16} />
                               Actividades
                            </button>
                            <button className={styles.dropdownItem} onClick={() => navigate(`/meeting/`)}>
                              <MessageCircle size={16} />
                              Comunicarse
                            </button>
                            <button className={styles.dropdownItem} onClick={() => patient.id !== undefined && desvincular(patient.id)}>
                              <UserMinus size={16} />
                              Desvincular
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noPatients}>
                  No hay pacientes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

