import React from 'react';
import '../../../assets/style/admin/Content/Dashboard.css';
import DataTable from './Datatable';

export const Dashboard: React.FC = () => {
    return (
        <section className="ma-home">
            <div className="ma-text">
                Dashboard
            </div>
            <div>
                <div className='ma-container'>
                    <div className='ma-box-1'>
                        <p>Crear Hospital</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 24 24" style={{ fill: "white" }}><path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path></svg>
                    </div>
                    <div className='ma-box-1'>
                        <p>Listar Hospitales</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 24 24" style={{ fill: "white" }}><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 10H7v-2h5v2zm5-4H7V8h10v2z"></path></svg>
                    </div>
                </div>
            </div>
            <div className='ma-user-box'>
                <p className='ma-user-title'>Users</p>
                <DataTable />
            </div>
        </section>
    );
};