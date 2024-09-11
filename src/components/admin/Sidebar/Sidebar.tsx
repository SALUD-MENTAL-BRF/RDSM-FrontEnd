import React, { useState } from 'react';
import '../../../assets/style/admin/Sidebar.css'

export const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className={`ma-sidebar ${isCollapsed ? 'ma-close' : ''}`}>
            <header className="ma-sidebar-header">
                <div className="ma-text ma-logo">
                    <span className="ma-name">MentalAid</span>
                    <span className="ma-profe">Desarrollador</span>
                </div>
                <i className="bx bx-menu ma-toggle" onClick={toggleSidebar}></i>
            </header>
            <div className="ma-menu-bar">
                <div className="ma-menu">
                    <li className="ma-search-box">
                        <i className="bx bx-search ma-icon"></i>
                        <input type="text" placeholder="Buscar..." />
                    </li>
                    <ul className="ma-menu-links">
                        <li className="ma-nav-link">
                            <a href="#">
                                <i className="bx bxs-home ma-icon"></i>
                                <span className="ma-text ma-nav-text">Home</span>
                            </a>
                        </li>
                        <li className="ma-nav-link">
                            <a href="#">
                                <i className="bx bx-plus-medical ma-icon"></i>
                                <span className="ma-text ma-nav-text">Agregar Hospital</span>
                            </a>
                        </li>
                        <li className="ma-nav-link">
                            <a href="#">
                                <i className="bx bxs-user ma-icon"></i>
                                <span className="ma-text ma-nav-text">Usuarios</span>
                            </a>
                        </li>
                        <li className="ma-nav-link">
                            <a href="#">
                                <i className="bx bxs-pie-chart ma-icon"></i>
                                <span className="ma-text ma-nav-text">Analiticas</span>
                            </a>
                        </li>
                        <li className="ma-nav-link">
                            <a href="#">
                                <i className="bx bxs-book-content ma-icon"></i>
                                <span className="ma-text ma-nav-text">Contenido</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ma-bottom-content">
                    <li>
                        <a href="#">
                            <i className="bx bxs-log-out ma-icon"></i>
                            <span className="ma-text ma-nav-text">Salir</span>
                        </a>
                    </li>
                </div>
            </div>
        </nav>
    );
};