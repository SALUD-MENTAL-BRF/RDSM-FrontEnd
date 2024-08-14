import React from 'react';
import '../../../assets/style/admin/Content/Dashboard.css'
import DataTable from './Datatable';

export const Dashboard: React.FC = () => {
    return (
        <section className="home">
            <div className="text">
                Dashboard
            </div>
            <div>
                <p className='user-title'>Users</p>
                <DataTable />
            </div>
        </section>
    );
};

