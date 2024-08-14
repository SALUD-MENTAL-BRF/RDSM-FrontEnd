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
                <div className='container'>
                    <div className='box-1'>
                        <p>Crear Hospital</p>
                    </div>
                    <div className='box-1'>
                        <p>Lista de Hospitales</p>
                    </div>
                </div>
            </div>
            <div className='user-box'>
                <p className='user-title'>Users</p>
                <DataTable />
            </div>
        </section>
    );
};

