import React, { useEffect, useRef, useState } from 'react';

export const Sidebar: React.FC = () => {
    // Definir tipos para las referencias
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLElement | null>(null);
    const searchBtnRef = useRef<HTMLLIElement | null>(null);
    const modeSwitchRef = useRef<HTMLDivElement | null>(null);
    const modeTextRef = useRef<HTMLSpanElement | null>(null);
    
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const sidebar = sidebarRef.current;
        const toggle = toggleRef.current;
        const searchBtn = searchBtnRef.current;
        const modeSwitch = modeSwitchRef.current;
        // const modeText = modeTextRef.current; // modeText no se usa aquí

        if (sidebar && toggle && searchBtn && modeSwitch) {
            const handleToggleClick = () => {
                sidebar.classList.toggle('close');
            };

            const handleSearchClick = () => {
                sidebar.classList.remove('close');
            };

            const handleModeSwitchClick = () => {
                document.body.classList.toggle('dark');
                setIsDarkMode(document.body.classList.contains('dark'));
            };

            toggle.addEventListener('click', handleToggleClick);
            searchBtn.addEventListener('click', handleSearchClick);
            modeSwitch.addEventListener('click', handleModeSwitchClick);

            return () => {
                toggle.removeEventListener('click', handleToggleClick);
                searchBtn.removeEventListener('click', handleSearchClick);
                modeSwitch.removeEventListener('click', handleModeSwitchClick);
            };
        }
    }, []);

    useEffect(() => {
        const modeText = modeTextRef.current;
        if (modeText) {
            modeText.textContent = isDarkMode ? 'Dark mode' : 'Light mode';
        }
    }, [isDarkMode]);

    return (
        <nav className="sidebar close" ref={sidebarRef}>

            <header>
                <div className="text logo">
                    <span className="name">MentalHealth</span>
                    <span className="profe">Administrador</span>
                </div>
                <i className="bx bx-menu toggle" ref={toggleRef}></i>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <li className="search-box" ref={searchBtnRef}>
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
                    <li className="">
                        <a href="#">
                            <i className="bx bx-log-out icon"></i>
                            <span className="text nav-text">Salir</span>
                        </a>
                    </li>
                    <li className="mode">
                        <div className="sun-moon">
                            <i className="bx bx-moon icon moon"></i>
                            <i className="bx bx-sun icon sun"></i>
                        </div>
                        <span className="mode-text text" ref={modeTextRef}>Modo oscuro</span>
                        <div className="toggle-switch" ref={modeSwitchRef}>
                            <span className="switch"></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
};
