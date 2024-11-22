import React, { useState, ChangeEvent } from "react";
import { LoginSubmit } from "./submits/LoginSubmit";
import styles from '../../assets/style/formularios/Login.module.css';  // Cambio aquí
import LoginGoogle from "./submits/LoginGoogle";

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

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <main className={`${styles.background}`}>
        <div className={`${styles.containerLogin}`}>
          <div className={`${styles.form}`}>
            <h2>Iniciar Sesión</h2>
            <div className={`${styles.formInputs}`}></div>
          </div>
          <div className={`${styles.logo}`}></div>
        </div>
      </main>
    </>
  );
};
