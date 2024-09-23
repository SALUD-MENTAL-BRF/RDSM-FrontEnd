import React, { useState, useEffect } from 'react';
import '../../assets/style/Home/Home.css';
import { Lougout } from './Logout';
import { CustomFetch } from '../../api/CustomFetch';
import useAuth from '../../hooks/useAuth';
import { User } from '../../types/user.dto';

export const Header: React.FC = () => {

  const { authState } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User>();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  useEffect(() => {
    if (authState.token) {
      CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [authState.token]);

  return (
    <header className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand d-flex align-items-center' href='/home'>
          <img
            src='/logo/logoNuevo.jpeg'
            alt='logo de MentalAid'
            className='logoMentalAid'
          />
        </a>
        <nav className='navbar-nav ms-auto'>
          <div className='ms-3 position-relative'>
            <img
              src={user?.imageUrl?.length  ?
                user?.imageUrl :
                "/image-example/imageUser.jpg"
                }
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