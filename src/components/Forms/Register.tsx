import React, { useState, ChangeEvent } from "react";
import { RegisterSubmit } from "./submits/RegisterSubmit";
import "../../assets/style/formularios/Register.css";
import LoginGoogle from "./submits/LoginGoogle";

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const [stateForm, setStateForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibilityChange = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="registerPage">
        <div className="registerPage__Secction_Form">
          <div className="registerPage__Form">
            <div className="registerPage__title">
              <h1>Registro</h1>
            </div>
            <form>
              <div className="registerPage__Form_input_userName">
                <input
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="username"
                  value={stateForm.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="registerPage__Form_input_email">
                <input
                  type="text"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={stateForm.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="registerPage__Form_input_password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  name="password"
                  value={stateForm.password}
                  onChange={handleInputChange}
                />
                <svg
                  onClick={handlePasswordVisibilityChange}
                  className="LoginPage__Form__input_email_svgOjo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z" />
                </svg>
              </div>
              <div className="registerPage__Form_input_confirmPassword">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={stateForm.confirmPassword}
                  onChange={handleInputChange}
                />
                <svg
                  onClick={handleConfirmPasswordVisibilityChange}
                  className="LoginPage__Form__input_email_svgOjo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z" />
                </svg>
              </div>

              <RegisterSubmit stateForm={stateForm} />
              <div className="registerPage__sectionForm-form">
                <LoginGoogle />
              </div>
            </form>

            <p>
              ¿Ya tienes una cuenta?{" "}
              <a className="registerForm-links" href="/login">
                Iniciar Sesión
              </a>
            </p>

            <p>
              ¿Olvidaste tu contraseña?{" "}
              <a className="registerForm-links" href="/login">
                Recuperar Contraseña
              </a>
            </p>
          </div>
        </div>
        <img
          className="registerPage-logo"
          src="/logo/logo-removebg-preview.png"
          alt="Logo de la empresa"
        />
      </div>
    </>
  );
};
