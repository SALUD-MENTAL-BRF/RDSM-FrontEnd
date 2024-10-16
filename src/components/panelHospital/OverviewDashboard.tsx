import React from 'react';
import { UserPlus, Brain, Calendar, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import styles from '../../assets/style/panelHospital/OveviewDashboard.module.css'

const OverviewDashboard: React.FC = () => {
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-3 mb-4">
          <MetricCard title="Pacientes Actuales" value="152" change="+5 desde la semana pasada" icon={<UserPlus size={16} />} />
        </div>
        <div className="col-md-3 mb-4">
          <MetricCard title="Sesiones de Terapia Hoy" value="48" change="+3 desde ayer" icon={<Brain size={16} />} />
        </div>
        <div className="col-md-3 mb-4">
          <MetricCard title="Personal en Turno" value="35" change="+2 desde el último turno" icon={<Calendar size={16} />} />
        </div>
        <div className="col-md-3 mb-4">
          <MetricCard title="Alertas de Crisis" value="2" change="-1 desde ayer" icon={<AlertTriangle size={16} />} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className={`card-header ${styles.cardHeader}`}>
              <h5 className="card-title mb-0">Estado de Unidades</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Unidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Psiquiatría Aguda</td>
                    <td className="text-warning">Alta Ocupación</td>
                  </tr>
                  <tr>
                    <td>Terapia Intensiva</td>
                    <td className="text-success">Normal</td>
                  </tr>
                  <tr>
                    <td>Rehabilitación</td>
                    <td className="text-success">Normal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className={`card-header ${styles.cardHeader}`}>
              <h5 className="card-title mb-0">Medicamentos Críticos</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Antidepresivos</td>
                    <td className="text-warning">Stock Medio</td>
                  </tr>
                  <tr>
                    <td>Antipsicóticos</td>
                    <td className="text-success">Suficiente</td>
                  </tr>
                  <tr>
                    <td>Ansiolíticos</td>
                    <td className="text-danger">Bajo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
