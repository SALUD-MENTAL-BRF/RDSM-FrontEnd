import React from "react";
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/CustomFetch";
import useAuth from "../../../hooks/useAuth";

interface FormState {
  email: string;
  password: string;
}

export const LoginSubmit: React.FC <{ stateForm: FormState }> = ({stateForm})=>{

  const { login } = useAuth();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        email: stateForm.email,
        password: stateForm.password,
      }

      const data = await CustomFetch('http://localhost:3000/auth/login', 'POST', payload);

      login(data.user, data.token); 

        Swal.fire({
          title: "Éxito",
          text: "Inicio de Sesión Exitoso",
          icon: "success",
          width: "50%",
          padding: "1rem",
          background: "#FFF",
          grow: "row",
      });

      setTimeout(() => {
          window.location.href = "/home"
      }, 2000);

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

  }

  return (
    <div className="botonLogin">
      <button type="submit" onClick={handleSubmit} className="botonLogin">
        Registro
      </button>
    </div>  
  )
}