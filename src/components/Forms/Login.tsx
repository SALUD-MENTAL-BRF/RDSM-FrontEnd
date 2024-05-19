import React, { useState, ChangeEvent } from "react";
import { LoginSubmit } from "./submits/LoginSubmit";

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
          <div className="loginPage__title m-2">
            <h1>Bienvenido a la página de Inicio de Sesión</h1>
          </div>
          <div className="loginPage__Form m-2">
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

            <p>
              ¿Olvidaste tu contraseña?{" "}
              <a href="/login">Recuperar Contraseña</a>
            </p>

            <p>
              ¿No tienes una cuenta? <a href="/register">Registrarse</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
