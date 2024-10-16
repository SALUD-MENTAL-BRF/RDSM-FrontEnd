import { FC, useState } from "react";
import styles from '../assets/style/panelHospital/HospitalPanelPage.module.css';
import OverviewDashboard from "../components/panelHospital/OverviewDashboard";
import { Aside } from "../components/panelHospital/Aside";
import PatientManagement from "../components/panelHospital/PatientManagement";
import { TherapyManagement } from "../components/panelHospital/TherapyManagement";
import { MedicationManagement } from "../components/panelHospital/MedicationManagement";
import { StaffManagement } from "../components/panelHospital/StaffManagement";
import { CrisisManagement } from "../components/panelHospital/CrisisManagement";

export const HospitalPanelPage: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'patients':
        return <PatientManagement />;
      case 'therapies':
        return <TherapyManagement />
      case 'medications':
        return <MedicationManagement />
      case 'staff':
        return <StaffManagement />
      case 'crisis':
        return <CrisisManagement />
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      <Aside setActiveTab={setActiveTab} />
      <main className={`${styles.mainContent} col-md-9 col-lg-10`}>
        <h2 className="h3 mb-4">Panel de Administración de Salud Mental</h2>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Vista General</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Pacientes</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'therapies' ? 'active' : ''}`} onClick={() => setActiveTab('therapies')}>Terapias</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'medications' ? 'active' : ''}`} onClick={() => setActiveTab('medications')}>Medicamentos</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>Personal</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'crisis' ? 'active' : ''}`} onClick={() => setActiveTab('crisis')}>Crisis</button>
          </li>
        </ul>
        {renderTabContent()}
      </main>
    </div>
  );
};
