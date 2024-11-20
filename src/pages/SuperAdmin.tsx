import React, { useState } from 'react';
import { Sidebar } from '../components/admin/Sidebar/Sidebar';
import { Dashboard } from '../components/admin/Content/Dashboard';
import { Home } from '../components/admin/Content/Home';
import '../assets/style/admin/Sidebar.css'
import { Hospitals } from '../components/admin/Content/hospitals/Hospitals'
import { UserList } from '../components/admin/Content/UserList'

export const SuperAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      <main className='mainContentAdmin'>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'Home' && <Home />}
          {activeTab === 'Agregar Hospital' && <Hospitals />}
          {activeTab === 'Usuarios' && <UserList />}
          {activeTab === 'Analiticas' && <Dashboard />}
      </main>
    </>
  );
};
