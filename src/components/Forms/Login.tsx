import React, { useState, ChangeEvent } from "react";
import { LoginSubmit } from "./submits/LoginSubmit";
import styles from '../../assets/style/formularios/Login.module.css';  // Cambio aquí
import LoginGoogle from "./submits/LoginGoogle";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion"

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
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Iniciar Sesión</h2>
              <div className={`${styles.formInputs}`}>
                <div className={`${styles.EmailInput}`}>
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="tucorreo@ejemplo.com" name="email" value={stateForm.email} onChange={handleInputChange} />
                </div>
                <div className={`${styles.PasswordInput}`}>
                  <label htmlFor="password">Contraseña</label>
                  <div className={`${styles.input}`}>
                    <input type={showPassword ? "text" : "password"} placeholder="******" name="password" value={stateForm.password} onChange={handleInputChange} />
                    {
                      !showPassword ? (
                        <Eye size={20} className={`${styles.eye}`} onClick={handlePasswordVisibilityChange} role='button'></Eye>
                      ):
                        <EyeOff size={20} className={`${styles.eye}`} onClick={handlePasswordVisibilityChange} role='button'></EyeOff>
                    }
                  </div>
                </div>
                <LoginSubmit stateForm={stateForm} />
                <div className={`${styles.links}`}>
                  <a href="/login">¿Olvidaste tu contraseña?</a>
                  <a href="/register">¿No tienes una cuenta?</a>
                </div>
                <LoginGoogle />
              </div>
            </motion.div>
          </div>
          <div className={`${styles.logo}`}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
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
