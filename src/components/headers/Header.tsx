import React from "react";
import logo from "/logo/image.png";
import "../../assets/style/style-header/headerWithoutLoggedIn.css";
// import { Lougout } from "./Logout";
import { ButtonsLoginRegister } from "./ButtonsLoginRegister";

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header__logo">
        <img className="Header__logo-img" src={logo} alt="logo" />
      </div>
      <div className="Header__buttons">
        <ButtonsLoginRegister />
      </div>
    </div>
  );
};
