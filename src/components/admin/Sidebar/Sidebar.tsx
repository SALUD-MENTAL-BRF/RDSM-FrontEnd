// Sidebar.tsx
import React, { useState } from 'react';
import '../../../assets/style/admin/Sidebar.css';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className={`ma-sidebar ${isCollapsed ? 'ma-close' : ''}`}>
            <header className="ma-sidebar-header d-flex justify-content-between align-items-center">
                <div className="ma-logo">
                    <span className="ma-name">MentalAid</span>
                    <span className="ma-profe">Desarrollador</span>
                </div>
                <button className="ma-toggle btn" onClick={toggleSidebar} title='colapsar'>
                    <i className="bx bx-menu"></i>
                </button>
            </header>
            <div className="ma-menu-bar">
                <div className="ma-menu">
                    <div className="ma-search-box mb-3">
                        <i className="bx bx-search ma-icon"></i>
                        <input type="text" placeholder="Buscar..." />
                    </div>
                    <ul className="ma-menu-links list-unstyled">
                        {[
                            { name: 'Home', icon: 'bxs-home' },
                            { name: 'Agregar Hospital', icon: 'bx-plus-medical' },
                            { name: 'Usuarios', icon: 'bxs-user' },
                            { name: 'Analiticas', icon: 'bxs-pie-chart' },
                            { name: 'Contenido', icon: 'bxs-book-content' },
                        ].map((item) => (
                            <li key={item.name} className={`ma-nav-link ${activeTab === item.name ? 'active' : ''}`}>
                                <button className="btn d-flex align-items-center" onClick={() => setActiveTab(item.name)}>
                                    <i className={`bx ${item.icon} ma-icon`}></i>
                                    <span className="ma-text ma-nav-text">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ma-bottom-content mt-auto">
                    <button className="btn d-flex align-items-center">
                        <i className="bx bxs-log-out ma-icon"></i>
                        <span onClick={() => navigate("/home")} className="ma-text ma-nav-text">Salir</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};
