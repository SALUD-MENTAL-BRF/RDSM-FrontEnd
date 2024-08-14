import React, { useState } from 'react';
// import '../../../assets/style/admin/Sidebar.css'

export const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    return (
        <nav className={`sidebar ${isCollapsed ? 'close' : ''}`}>
            <header>
                <div className="text logo">
                    <span className="name">MentalHealth</span>
                    <span className="profe">Desarrollador</span>
                </div>
                <i className="bx bx-menu toggle" onClick={toggleSidebar}></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box">
                        <i className="bx bx-search icon"></i>
                        <input type="text" placeholder="Buscar..." />
                    </li>
                    <ul className="menu-links">
                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bxs-home icon"></i>
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-plus-medical icon"></i>
                            <span className="text nav-text">Agregar Hospital</span>
                        </a>
                    </li>
                    
                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bxs-user icon"></i>
                            <span className="text nav-text">Usuarios</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bxs-pie-chart icon"></i>
                            <span className="text nav-text">Analiticas</span>
                        </a>
                    </li>
                  
                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bxs-book-content icon"></i>
                            <span className="text nav-text">Contenido</span>
                        </a>
                    </li>
                   
                    </ul>
                </div>
                <div className="bottom-content">
                    <li>
                        <a href="#">
                            <i className="bx bxs-log-out icon"></i>
                            <span className="text nav-text">Salir</span>
                        </a>
                    </li>
                    <li className="mode">
                        <div className="sun-moon">
                            <i className={`bx bxs-moon icon moon ${isDarkMode ? 'active' : ''}`}></i>
                            <i className={`bx bxs-sun icon sun ${!isDarkMode ? 'active' : ''}`}></i>
                        </div>
                        <span className="mode-text text">{isDarkMode ? 'Modo oscuro' : 'Modo claro'}</span>
                        <div className="toggle-switch" onClick={toggleDarkMode}>
                            <span className={`switch ${isDarkMode ? 'active' : ''}`}></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
};

