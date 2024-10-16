import React from 'react';
import styles from '../../assets/style/panelHospital/MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="card">
      <div className={`card-header d-flex justify-content-between align-items-center ${styles.cardHeader}`}>
        <h6 className="card-title mb-0">{title}</h6>
        {icon}
      </div>
      <div className="card-body">
        <p className="card-text h4 mb-0">{value}</p>
        <small className={styles.customBlueText}>{change}</small>
      </div>
    </div>
  );
};

export default MetricCard;
