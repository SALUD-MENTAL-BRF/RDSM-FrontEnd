import React from 'react';
import '../../assets/style/Home/Home.css';

export const Header: React.FC = () => {
  return (
    <header className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand d-flex align-items-center' href='#'>
          <img
            src='./logo/logoNuevo.jpeg'
            alt='logo de MentalAid'
            className='logoMentalAid'
          />
        </a>
        <nav className='navbar-nav ms-auto'>
          <a className='nav-link text-teal' href='#servicios'>
            Servicios
          </a>
          <a className='nav-link text-teal' href='#como-funciona'>
            Cómo Funciona
          </a>
          <a className='nav-link text-teal' href='#contacto'>
            Contacto
          </a>
          <div className='ms-3'>
            <img
              src='./image-example/imageUser.jpg'
              alt='User Profile'
              className='rounded-circle user-profile-pic'
              width={40}
              height={40}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
