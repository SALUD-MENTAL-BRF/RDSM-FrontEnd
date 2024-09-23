import { useEffect, useState } from "react";
import { CustomFetch } from "../api/CustomFetch";

export interface RolesList {
  id: number;
  type: string;
}

interface FetchError {
  message: string;
}

export const useFetchRoles = () => {
  const [rolesList, setRolesList] = useState<RolesList[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await CustomFetch(
          `${import.meta.env.VITE_API_URL}roles`,
          'GET',
        );
        setRolesList(response);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
        console.error('Error fetching users:', err); 
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { rolesList, error, loading };
};
