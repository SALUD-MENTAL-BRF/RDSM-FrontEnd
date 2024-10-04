import { useEffect, useState } from "react";
import { Hospital } from "../types/Hospital";
import { CustomFetch } from "../api/CustomFetch";

export const useFetchHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital`, "GET");

        setHospitals(response);
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

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
};
