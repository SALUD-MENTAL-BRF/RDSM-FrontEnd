import React, { useState } from 'react';
import { Sidebar } from '../components/admin/Sidebar/Sidebar';
import { Dashboard } from '../components/admin/Content/Dashboard';
import { Home } from '../components/admin/Content/Home';
import '../assets/style/admin/Sidebar.css'
import DataTable from '../components/admin/Content/Datatable';

export const SuperAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      <main>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className='mainContentAdmin'>
          {activeTab === 'Home' && <Home />}
          {activeTab === 'Agregar Hospital' && <Dashboard />}
          {activeTab === 'Usuarios' && <DataTable />}
        </div>
      </main>
    </>
  );
};
