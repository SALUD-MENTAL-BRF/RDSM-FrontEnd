import React, { useState, ChangeEvent } from "react";
import { LoginSubmit } from "./submits/LoginSubmit";
import '../../assets/style/formularios/Login.css'

interface FormState {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [stateForm, setStateForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginPage__Secction_Form">
          <div className="loginPage__Form">
            <div className="loginPage__title">
              <h1>Inicio de Sesión</h1>
            </div>
            <form>
              <div className="loginPage__Form_input_email">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={stateForm.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="loginPage__Form_input_password">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={stateForm.password}
                  onChange={handleInputChange}
                />
              </div>
              <LoginSubmit stateForm={stateForm}/> 
            </form>

            <p>¿Olvidaste tu contraseña? <a className='registerForm-links' href="/login">Recuperar Contraseña</a></p>

            <p>¿No tienes una cuenta? <a className='registerForm-links' href="/register">Registrarse</a></p>
          </div>
        </div>
        <img className='loginPage-logo' src="/logo/logo-removebg-preview.png" alt="Logo de la empresa" />
      </div>
    </>
  );
};
