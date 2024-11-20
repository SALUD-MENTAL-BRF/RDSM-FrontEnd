import { FC } from "react"
import styles from '../../assets/style/panelHospital/Aside.module.css'

interface AsideProps {
  setActiveTab: (tab: string) => void
}

export const Aside:FC<AsideProps> = ({ setActiveTab }) => {
  return (
    <aside className={`${styles.sidebar} col-md-3 col-lg-2 d-md-block`}>
    <h1 className="h4 mb-4">MentalAid Admin</h1>
    <nav>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('overview')}>Vista General</button>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('patients')}>Pacientes</button>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('therapies')}>Terapias</button>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('medications')}>Medicamentos</button>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('staff')}>Personal</button>
      <button className={styles.sidebarButton} onClick={() => setActiveTab('crisis')}>Gestión de Crisis</button>
    </nav>
  </aside>
  )
}
