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
  requiredRoleId?: number;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoleId,
  children,
}) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authState.token) {
      CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, "GET")
        .then((response) => {
          setUser(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Manejar mejor el error
          alert("Error al cargar los datos del usuario.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [authState.token]);

  // Si no está logueado, redirigir a la página de login
  if (!authState.isLogged) {
    return <Navigate to="/login" />;
  }

  // Mostrar un estado de carga mientras se obtienen los datos del usuario
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir
  if (requiredRoleId && user?.roleId !== requiredRoleId) {
    return <Navigate to="/login" />;
  }

  // Si está logueado y tiene los permisos adecuados, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
