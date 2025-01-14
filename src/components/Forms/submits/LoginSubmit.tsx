import React from "react";
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/CustomFetch";
import useAuth from "../../../hooks/useAuth";
import styles from "../../../assets/style/formularios/Login.module.css";  // Cambio aquí

interface FormState {
  email: string;
  password: string;
}

export const LoginSubmit: React.FC<{ stateForm: FormState }> = ({ stateForm }) => {

  const { login } = useAuth();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        email: stateForm.email,
        password: stateForm.password,
      };

      const data = await CustomFetch(`${import.meta.env.VITE_API_URL}auth/login`, 'POST', payload);

      login(data.token);

      Swal.fire({
        title: "Éxito",
        text: "Inicio de Sesión Exitoso",
        icon: "success",
        width: "50%",
        padding: "1rem",
        background: "#FFF",
        grow: "row",
      });

    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el usuario",
        icon: "error",
        width: "50%",
        padding: "1rem",
        background: "#FFF",
        grow: "row",
      });
    }
  };

  return (
    <>
      <button className={`${styles.buttonLogin}`} type="submit" onClick={handleSubmit}> Iniciar Sesión </button>
    </>
  );
};
