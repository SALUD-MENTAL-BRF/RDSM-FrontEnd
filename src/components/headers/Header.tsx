import React from "react";
import logo from "/logo/image.png";
import "../../assets/style/style-header/headerWithoutLoggedIn.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header__logo">
        <img className="Header__logo-img" src={logo} alt="logo" />
      </div>
      <div className="Header__buttons">
        <Link to="/login" type="button" className="btn Header__buttons-login">
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          type="button"
          className="btn Header__buttons-register"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
};
