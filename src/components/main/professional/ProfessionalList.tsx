import styles from "../../../assets/style/professional/ProfessionalList.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFetch } from "../../../api/CustomFetch.tsx";
import { ProfileProfessionalDto } from "../../../types/profileProfessional.dto.ts";
import React from "react";
import { Calendar, Mail, NotepadText, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";


export const ProfessionalList = () => {
  const [professionalState, setProfessionalState] = useState<Array<ProfileProfessionalDto>>([]);
  const [barSearch, setBarSearch] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await CustomFetch(`${import.meta.env.VITE_API_URL}professional`, 'GET');
      setProfessionalState(data);
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarSearch(e.target.value);
  };

  const filteredProfessionals = professionalState.filter((professional) =>
    `${professional.professional?.firstname} ${professional.professional?.lastname}`
      .toLowerCase()
      .includes(barSearch.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <main className={styles.backgroundMain}>
      <section className={styles.containerFilter}>
        <h1 style={{color:'#10b981'}}>Directorio de Profesionales</h1>
        <div className={styles.searchBar}>
          <input
            className={styles.searchName}
            type="text"
            placeholder="Buscar Profesional"
            onChange={handleInputChange}
            value={barSearch}
          />
          <select name="filter" id="filter">
            <option value="all">Todos</option>
            <option value="Neurodesarrollo">Neurodesarrollo</option>
            <option value="Psicología">Psicología</option>
            <option value="Terapia Familiar">Terapia Familiar</option>
            <option value="Terapia de Pareja">Terapia de Pareja</option>
          </select>
          <button style={{backgroundColor: '#10b981'}}>Buscar</button>
        </div>
      </section>

      <motion.div
          className={`${styles.arrow} ms-4 mt-4`}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/home')}
        >
          <ArrowLeft size={40} color="#43c1bb" />
        </motion.div>
      <section className={styles.cardsList}>
        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.map((professional) => (
            <div
              className={styles.cardProfessional}
              key={professional.id}
            >
              <img
                src={
                  professional.professional?.user?.imageUrl
                    ? professional.professional.user.imageUrl
                    : "./image-example/imageUser.jpg"
                }
                alt="user"
              />
              <h2>{professional.professional?.firstname} {professional.professional?.lastname}</h2>
              <p className={styles.professionalTitle}>{professional.professional?.title}</p>
              <p
                title={professional.professional?.specialization}
                className={styles.professionalSpecialization}
              >
                {professional.professional?.specialization}
              </p>
              <div className={styles.containerData}>
                <div className={styles.Data}>
                  <User size={20} color="#16A34A" />
                  <p>{professional.professional?.user?.username}</p>
                </div>
                <div className={styles.Data}>
                  <Mail size={20} color="#16A34A" />
                  <p>{professional.professional?.user?.email}</p>
                </div>
                <div className={styles.Data}>
                  <NotepadText size={20} color="#16A34A" />
                  <p>{professional.professional?.tuition}</p>
                </div>
                <div className={styles.Data}>
                  <Calendar size={20} color="#16A34A" />
                  <p>{professional.professional?.turnOfAttention}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile-professional/${professional.id}`);
                }}
                className={styles.ViewDetails}
              >
                Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <p>No hay profesionales que coincidan con tu búsqueda.</p>
        )}
      </section>
    </main>
  );
};
