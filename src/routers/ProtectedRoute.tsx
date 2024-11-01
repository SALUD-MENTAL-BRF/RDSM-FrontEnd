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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const roleSuperAdmin = parseInt(import.meta.env.VITE_ROLE_ADMIN, 10);
  const roleHospital = parseInt(import.meta.env.VITE_ROLE_HOSPITAL, 10);

  useEffect(() => {
    const fetchUser = async () => {
      if (authState.token) {
        try {
          const response = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, "GET");
          if (response && response.roleId) {
            setUser(response);
          } else {
            console.error("Invalid user data");
            alert("Datos de usuario no válidos.");
          }
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

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (user.roleId === roleSuperAdmin && window.location.pathname === "/hospital") {
    return <Navigate to={"/home"} />;
  }

  if (user.roleId === roleHospital && window.location.pathname === "/superAdmin") {
    return <Navigate to="/home" />;
  }

  if (user.roleId !== roleSuperAdmin && user.roleId !== roleHospital) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;