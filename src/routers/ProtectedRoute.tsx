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
  VITE_ROLE_ADMIN?: string;
  VITE_ROLE_HOSPITAL?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { children, VITE_ROLE_ADMIN, VITE_ROLE_HOSPITAL } = props;
  const ROLE_VITE_ROLE_ADMINSUPERADMIN = Number(VITE_ROLE_ADMIN);
  const ROLE_VITE_ROLE_HOSPITAL = Number(VITE_ROLE_HOSPITAL);
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
    return <Navigate to="/login" />;
  }

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (user.roleId === ROLE_VITE_ROLE_ADMINSUPERADMIN) {
    return children;
  }

  if (VITE_ROLE_HOSPITAL && user.roleId === ROLE_VITE_ROLE_HOSPITAL) {
    return children;
  }

  return children;
};

export default ProtectedRoute;
