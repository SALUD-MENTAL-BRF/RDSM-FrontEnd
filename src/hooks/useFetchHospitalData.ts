import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { CustomFetch } from "../api/CustomFetch";

interface Tuser {
  id: string;
  username: string;
  email: string;
  password: string;
  googleId: null | string;
  imageUrl: null | string;
  updatedAt: string;
  createdAt: string;
  status: string;
  roleId: number;
  rol: {
    type: string;
  };
}

export const useFetchHospitalData = () => {
  const { authState } = useAuth();
  const [user, setUser] = useState<Tuser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitalData, setHospitalData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authState.token) {
        try {
          const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, "GET");
          setUser(user);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };
    fetchUserData();
  }, [authState.token]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      if (user) {
        try {
          const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital/${user.id}`, "GET");
          setHospitalData(response);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchHospitalData();
  }, [user]); // Dependencia en `user` para ejecutar cuando se actualiza

  return { hospitalData, loading, error };
};
