import React, { useContext } from "react";
import logo from "/logo/image.png";
import { Lougout } from "./Logout.tsx";
import { ButtonsLoginRegister } from "./ButtonsLoginRegister.tsx";
import { AuthContext } from "../../context/AuthProvider";
import '../../assets/style/header/header.css'

export const Header: React.FC = () => {

  const { authState } = useContext(AuthContext)

  return (
    <div className="Header">
      <div className="Header__logo">
        <img className="Header__logo-img" src={logo} alt="logo" />
      </div>
      <div className="Header__buttons">
        {authState.islogged? <Lougout /> : <ButtonsLoginRegister />}
      </div>
    </div>
  );
};
