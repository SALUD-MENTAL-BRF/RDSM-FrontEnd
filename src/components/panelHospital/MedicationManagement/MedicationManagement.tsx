import { Edit, PlusCircle, Trash } from "lucide-react"
import { FC, useEffect, useState } from "react"
import styles from '../../../assets/style/panelHospital/MedicationManagement.module.css'
import { ModalMedicationManagement } from "./modalMedicationManagement"
import useAuth from "../../../hooks/useAuth"

export const MedicationManagement:FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [changed, setChanged] = useState(false)
  const [medications, setMedications] = useState<any[]>([]);
  const [_error, setError] = useState<string | null>(null);
  const { authState } = useAuth();
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    try {
      setChanged(true);
      fetch(`${import.meta.env.VITE_API_URL}hospital/medicines/${authState.token}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMedications(data.medicines)
          setFilteredMedications(data.medicines)
        })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setChanged(false);
    }
  }, [changed]);

  useEffect(() => {
    const results = medications.filter((medication) => {
      const name = medication.name?.toLowerCase() || "";
      const description = medication.description?.toLowerCase() || "";
      const quantity = typeof medication.quantity === "string" ? medication.quantity.toLowerCase() : "";
  
      return (
        name.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase()) ||
        quantity.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredMedications(results);
  }, [searchTerm, medications]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-auto" placeholder="Buscar medicamentos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className={`btn ${styles.customBlueBackground}`} onClick={toggleModal}>
          <PlusCircle size={16} className="me-2" /> Agregar Medicamento
        </button>
      </div>
      <div className="card">
        
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre del Medicamento</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Stock Actual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredMedications.length > 0
                ? filteredMedications.map((medication: any) => (
                  <tr key={medication.id}>
                    <td>{medication.name}</td>
                    <td>{medication.type}</td>
                    <td>{medication.description}</td>
                    <td>{medication.quantity}</td>
                    {
                      medication.quantity > 50 ? <td className="text-success">En Stock</td> : <td className="text-danger">Se necesita Reponer</td>
                    }
                    <td>
                      <button className="btn btn-sm btn-link"><Edit size={16} className={styles.customBlueText} /></button>
                      <button className="btn btn-sm btn-link"><Trash size={16} className={styles.customBlueText} /></button>
                    </td>
                  </tr>
                ))
                : <tr><td colSpan={6}>No se encontraron resultados</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      {
        showModal && <ModalMedicationManagement toggleModal={toggleModal} setChanged={setChanged} />
      }
    </div>
  )
}
