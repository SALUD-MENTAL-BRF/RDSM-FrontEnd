import { useEffect, useState } from "react";
import { CustomFetch } from "../api/CustomFetch";

export const useFetchSpecialityHospital = () => {
  const [specialityHospital, setSpecialityHospital] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialityHospital = async () => {
      try {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}specialityHospital`, "GET");

        setSpecialityHospital(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialityHospital();
  }, []);

  return { specialityHospital, loading, error };
};
