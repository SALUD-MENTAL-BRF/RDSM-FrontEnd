import React, { useState, ChangeEvent } from 'react';
import { RegisterSubmit } from './submits/RegisterSubmit';

interface FormState {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const [stateForm, setStateForm] = useState<FormState>({
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      <div className="registerPage">
        <div className="registerPage__Secction_Form">
          <div className="registerPage__title m-2">
            <h1>Bienvenido a la página de registro</h1>
          </div>
          <div className="registerPage__Form m-2">
            <form>
              <div className="registerPage__Form_input_name">
                <input
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={stateForm.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="registerPage__Form_input_lastName">
                <input
                  type="text"
                  placeholder="Apellido"
                  name="lastName"
                  value={stateForm.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="registerPage__Form_input_userName">
                <input
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="userName"
                  value={stateForm.userName}
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
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={stateForm.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="registerPage__Form_input_confirmPassword">
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={stateForm.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <RegisterSubmit stateForm={stateForm} />
            </form>

            <p>
              ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
            </p>

            <p>
              ¿Olvidaste tu contraseña? <a href="/login">Recuperar Contraseña</a>
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
