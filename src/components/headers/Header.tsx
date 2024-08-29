import React from "react";
import { Lougout } from "./Logout.tsx";
import { useNavigate } from "react-router-dom";
import "../../assets/style/header/header.css";
import logo from '/logo/logoNuevo.jpeg'

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="Header navbar navbar-expand-lg navbar-light bg-light">
      {/* {home ? */}
      <div className="d-flex">
        <img src={logo} alt="logo de MentalAid" className='logoMentalAid' />
      </div>
        {/* <nav className="navbar-nav ms-auto">
         <a className="nav-link text-teal" href="#servicios">Servicios</a>
         <a className="nav-link text-teal" href="#como-funciona">Cómo Funciona</a>
         <a className="nav-link text-teal" href="#contacto">Contacto</a>
       </nav> */}
      <div className="d-flex align-items-center">
        <div role="button" title="Notificaciones">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#25c7b1"
            className="bi bi-bell-fill me-4"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
          </svg>
        </div>
        <div role="button" title="Profile">
          <svg
            onClick={() => navigate("/profile")}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#25c7b1"
            className="bi bi-gear-fill me-4"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
        </div>
        <Lougout />
        {/* <div className="rounded bg-dark w-25">
              <p>Perfil</p>
          </div> */}
      </div>
      {/* : <></>
      } */}

      {/* {!home ?
        <div>
          <div className="Header__logo">
            <img className="Header__logo-img" src={logo} alt="logo" />
          </div>
          <div className="Header__buttons">
            {authState.islogged? <Lougout /> : <ButtonsLoginRegister />}
          </div>
        </div>
        :<></>
      } */}
    </header>

  //   <header className="navbar navbar-expand-lg navbar-light bg-light">
  //   <div className="container">
  //     <a className="navbar-brand d-flex align-items-center" href="#">
  //       <img src="./logo/logoNuevo.jpeg" alt="logo de MentalAid" className='logoMentalAid' />
  //     </a>

  //   </div>
  // </header>
  );
};
