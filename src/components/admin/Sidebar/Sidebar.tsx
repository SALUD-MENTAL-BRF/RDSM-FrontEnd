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
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-bar-chart-alt-2 icon"></i>
                            <span className="text nav-text">Ganancia</span>
                        </a>
                    </li>
                    
                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-bell icon"></i>
                            <span className="text nav-text">Notificaciones</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-pie-chart-alt icon"></i>
                            <span className="text nav-text">Analiticas</span>
                        </a>
                    </li>
                  
                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-heart icon"></i>
                            <span className="text nav-text">Me gustas</span>
                        </a>
                    </li>
                   
                    <li className="nav-link">
                        <a href="#">
                            <i className="bx bx-wallet icon"></i>
                            <span className="text nav-text">Carteras</span>
                        </a>
                    </li>
                    </ul>
                </div>
                <div className="bottom-content">
                    <li>
                        <a href="#">
                            <i className="bx bx-log-out icon"></i>
                            <span className="text nav-text">Salir</span>
                        </a>
                    </li>
                    <li className="mode">
                        <div className="sun-moon">
                            <i className={`bx bx-moon icon moon ${isDarkMode ? 'active' : ''}`}></i>
                            <i className={`bx bx-sun icon sun ${!isDarkMode ? 'active' : ''}`}></i>
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

