import React from "react"
import logo from '/logo/image.png'
import '../../assets/style/style-header/headerWithoutLoggedIn.css'

export const HeaderWithoutLoggedIn: React.FC = () => {
  return (
    <div className="Header">
        <div className="Header__logo">
          <img className='Header__logo-img' src={logo} alt="logo" />
        </div>
        <div className="Header__buttons">
            <a className="btn Header__buttons-login" href="/login">Iniciar Sesión</a>
            <a className="btn Header__buttons-register" href="/register">Registro</a>
        </div>
      </div>
  )
}
