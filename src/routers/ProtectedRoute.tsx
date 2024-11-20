// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { CustomFetch } from "../api/CustomFetch";
// import useAuth from "../hooks/useAuth";

// interface User {
//   email: string;
//   googleId: string;
//   id: number;
//   imageUrl: string;
//   password: string;
//   roleId: number;
//   username: string;
//   createdAt: string;
// }

// interface ProtectedRouteProps {
//   children: JSX.Element;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { authState } = useAuth();
//   const [user, setUser] = useState<User | null>(null);

//   const roleSuperAdmin = parseInt(import.meta.env.VITE_ROLE_ADMIN, 10);
//   const roleHospital = parseInt(import.meta.env.VITE_ROLE_HOSPITAL, 10);
//   const roleProfessional = Number(import.meta.env.VITE_ROLE_PROFESSIONAL);
//   const rolePatient = Number(import.meta.env.VITE_ROLE_PATIENT)
//   const roleGuest = Number(import.meta.env.VITE_ROLE_GUEST)

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (authState.token) {
//         try {
//           const response = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, "GET");
//           if (response && response.roleId) {
//             setUser(response);
//           } else {
//             console.error("Invalid user data");
//             alert("Datos de usuario no válidos.");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//           alert("Error al cargar los datos del usuario.");
//         }
//       } else {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, [authState.token]);

//   if (user === null) {
//     return <div>Loading...</div>;
//   }

//   if (user.roleId === roleSuperAdmin && window.location.pathname === "/hospital") {
//     return <Navigate to={"/home"} />;
//   }

//   if (user.roleId === roleHospital && window.location.pathname === "/superAdmin") {
//     return <Navigate to="/home" />;
//   }

//   if (user.roleId !== roleSuperAdmin && user.roleId !== roleHospital) {
//     return <Navigate to="/home" />;
//   }

//   if (user.roleId !== roleProfessional && window.location.pathname === "/patient") {
//     return <Navigate to="/home" />;
//   }
//   return children;
// };

// export default ProtectedRoute;


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
  VITE_ROLE_PROFESSIONAL?:string;
  VITE_ROLE_PATIENT?: string;
  VITE_ROLE_HOSPITAL?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

  const { children, VITE_ROLE_ADMIN,VITE_ROLE_PROFESSIONAL, VITE_ROLE_PATIENT,VITE_ROLE_HOSPITAL} = props;
  const ROLE_VITE_ROLE_ADMINSUPERADMIN = Number(VITE_ROLE_ADMIN);
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

  if (VITE_ROLE_ADMIN && user.roleId!== ROLE_VITE_ROLE_ADMINSUPERADMIN) {
    return <Navigate to="/home" />;
  }

  if (VITE_ROLE_HOSPITAL && user.roleId!== Number(VITE_ROLE_HOSPITAL)) {
    return <Navigate to="/home" />;
  }

  if(VITE_ROLE_PROFESSIONAL && user.roleId !== Number(VITE_ROLE_PROFESSIONAL)) {
    return <Navigate to={"/home"}/>
  }

  if (VITE_ROLE_PATIENT && user.roleId !== Number(VITE_ROLE_PATIENT)) {
    return <Navigate to={"/home"}/>
  }

  return children;
};

export default ProtectedRoute;
