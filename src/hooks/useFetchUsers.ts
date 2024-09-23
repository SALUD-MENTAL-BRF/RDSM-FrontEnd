import { useEffect, useState } from "react";
import { CustomFetch } from "../api/CustomFetch";
import { User } from "../types/user.dto";

interface FetchError {
  message: string;
}

export const useFetchUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await CustomFetch(
          `${import.meta.env.VITE_API_URL}users`,
          'GET',
        );
        setUsers(response);
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

  return { users, error, loading };
};
