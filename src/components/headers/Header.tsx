import React, { useContext } from "react";
import logo from "/logo/image.png";
import "../../assets/style/style-header/headerWithoutLoggedIn.css";
import { Lougout } from "./Logout.tsx";
import { ButtonsLoginRegister } from "./ButtonsLoginRegister.tsx";
import { AuthContext } from "../../context/AuthProvider";

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
