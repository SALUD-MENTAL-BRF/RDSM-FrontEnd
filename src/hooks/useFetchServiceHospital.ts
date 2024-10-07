import { useEffect, useState } from "react";
import { CustomFetch } from "../api/CustomFetch";

export const useFetchServiceHospital = () => {
  const [serviceHospital, setServiceHospital] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceHospital = async () => {
      try {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}serviceHospital`, "GET");

        setServiceHospital(response);
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

    fetchServiceHospital();
  }, []);

  return { serviceHospital, loading, error };
};
