import React, { useState } from 'react';
import '../../assets/style/Home/Home.css';
import { Lougout } from './Logout';

export const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand d-flex align-items-center' href='/home'>
          <img
            src='./logo/logoNuevo.jpeg'
            alt='logo de MentalAid'
            className='logoMentalAid'
          />
        </a>
        <nav className='navbar-nav ms-auto'>
          <div className='ms-3 position-relative'>
            <img
              src='./image-example/imageUser.jpg'
              alt='User Profile'
              className='rounded-circle user-profile-pic'
              width={40}
              height={40}
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {isDropdownOpen && (
              <ul className='dropdown-menu show position-absolute end-0 mt-2'>
                <li><a className='dropdown-item' href='/profile'>Mi Perfil</a></li>
                <li><a className='dropdown-item' href='#'>Configuración</a></li>
                <li><Lougout/></li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};