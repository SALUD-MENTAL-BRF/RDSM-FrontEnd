import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CustomFetch } from "../api/CustomFetch";
import useAuth from "../hooks/useAuth";

interface User {
  email: string;
  googleId: string;
  id: number;
  imageUrl: string;
  password: string;
  roleId: number;
  username: string;
  createdAt: string;
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

const ROLE_SUPERADMIN: number = Number(import.meta.env.VITE_ROLE_ADMIN);

  const { children } = props;
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (authState.token) {
        try {
          const response = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, "GET");
          setUser(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
          alert("Error al cargar los datos del usuario.");
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [authState.token]);

  if (!authState.isLogged) {
    console.log("Usuario no autenticado, redirigiendo a login");
    return <Navigate to="/login" />;
  }
  
  if (user === null) {
    return <div>Loading...</div>;  // Esperar a que los datos del usuario se carguen
  }
  
  if (user.roleId !== ROLE_SUPERADMIN) {
    console.log("Usuario no autorizado, redirigiendo a login");
    return <Navigate to="/login" />;
  }
  
  console.log("Acceso autorizado, mostrando contenido");
  

  return children;
};

export default ProtectedRoute;
