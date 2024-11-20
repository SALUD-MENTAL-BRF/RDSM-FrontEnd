import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import styles from "../../../assets/style/panelHospital/StaffManagement.module.css";
import { ModalStaffManagement } from "./modalStaffManagment";
import useAuth from "../../../hooks/useAuth";
import { CustomFetch } from "../../../api/CustomFetch";
import Swal from "sweetalert2";

export const StaffManagement: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<any[]>([]);
  const [_error, setError] = useState<string | null>(null);
  const { authState } = useAuth();
  const [changed, setChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => { 
    try {
      fetch(`${import.meta.env.VITE_API_URL}professional/token/${authState.token}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfessionals(data.professionals);
          setFilteredProfessionals(data.professionals);
        })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }, [changed]);

  useEffect(() => {
    const results = professionals.filter((professional) => {
      const username = professional.user.username?.toLowerCase() || "";
      const specialization = professional.specialization?.toLowerCase() || "";
      const tuition = typeof professional.tuition === "string" ? professional.tuition.toLowerCase() : "";
  
      return (
        username.includes(searchTerm.toLowerCase()) ||
        specialization.includes(searchTerm.toLowerCase()) ||
        tuition.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProfessionals(results);
  }, [searchTerm, professionals]);

  const handleDelete = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await CustomFetch(`${import.meta.env.VITE_API_URL}professional/${id}`, 'DELETE');
          setChanged((prev: boolean) => !prev);
        }
        if (result.isDenied) {
          return;
        }
      });
    } catch (err) {
      console.error('Error deleting professional:', err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Buscar personal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`btn ${styles.customBlueBackground}`}
          onClick={toggleModal}
        >
          <PlusCircle size={16} className="me-2" />
          Agregar Personal
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especialidad</th>
                <th>Matricula</th>
                <th>Turno</th>
                <th>Pacientes Asignados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfessionals.length > 0
                ? filteredProfessionals.map((professional: any) => (
                    <tr key={professional.id}>
                      <td>{professional.user.username}</td>
                      <td>{professional.specialization}</td>
                      <td>{professional.tuition}</td>
                      <td>{professional.turnOfAttention}</td>
                      <td>{professional.patient.length === 0 ? 'No asignados' : professional.patient.length}</td>
                      <td>
                        <button className="btn btn-sm btn-link">
                          <Edit size={16} className={styles.customBlueText} />
                        </button>
                        <button className="btn btn-sm btn-link" onClick={() => handleDelete(professional.id)}>
                          <Trash2 size={16} className={styles.customBlueText} />
                        </button>
                      </td>
                    </tr>
                  ))
                : <tr><td colSpan={6}>No se encontraron resultados</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <ModalStaffManagement toggleModal={toggleModal} setChanged={setChanged} />}
    </div>
  );
};
