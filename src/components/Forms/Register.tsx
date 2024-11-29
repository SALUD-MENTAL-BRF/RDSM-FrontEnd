import React, { useState, ChangeEvent } from "react";
import { RegisterSubmit } from "./submits/RegisterSubmit";
import styles from "../../assets/style/formularios/Register.module.css";
import LoginGoogle from "./submits/LoginGoogle";
import { motion } from "framer-motion"
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { Eye, EyeOff } from "lucide-react";

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

  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };

  useBodyScrollLock(true)

  return (
    <>
      <main className={`${styles.background}`}>
        <div className={`${styles.containerRegister}`}>
          <div
            className={`${styles.formContainer}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Crear Cuenta</h2>
              <div className={`${styles.formInputs}`}>
                <div className={`${styles.UsernameInput}`}>
                  <label htmlFor="username">Nombre de Usuario</label>
                  <input type="text" onChange={handleInputChange} placeholder="tucorreo" name="username" id="username_input" required />
                </div>
                <div className={`${styles.EmailInput}`}>
                  <label htmlFor="email">Email</label>
                  <input type="email" onChange={handleInputChange} placeholder="tucorreo@gmail.com" name="email" id="email_input" required />
                </div>
                <div className={`${styles.PasswordInput}`}>
                  <label htmlFor="password">Contraseña</label>
                  <div className={`${styles.PasswordInputdiv}`}>
                    <input type={showPassword ? "text" : "password"} onChange={handleInputChange} placeholder="Contraseña" name="password" id="password_input" required />
                    {
                      showPassword ?
                        <EyeOff size={20} onClick={handlePasswordVisibilityChange} /> :
                        <Eye size={20} onClick={handlePasswordVisibilityChange} />
                    }
                  </div>
                </div>
                <div className={`${styles.PasswordInputConfirm}`}>
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input type={showPassword ? "text" : "password"} onChange={handleInputChange} placeholder="Confirmar Contraseña" name="confirmPassword" id="confirmPassword_input" required />
                </div>
                <RegisterSubmit stateForm={stateForm} />
                <div className={`${styles.link}`}>
                  <a href="/login">¿Ya tiene una cuenta?</a>
                </div>
                <LoginGoogle />
              </div>
            </motion.div>
          </div>
          <div
            className={`${styles.logo}`}
          >
            <motion.div
              initial={{ opacity: 0, x: 50}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${styles.logoContainer}`}
            >
              <img src="./logo/image.webp" alt="Logo de MentalAid" />
              <p>Tu espacio seguro para el cuidado de la salud mental.</p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};
