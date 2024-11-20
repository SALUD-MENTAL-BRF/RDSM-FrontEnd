import { useEffect, useState } from "react";
import { CustomFetch } from "../api/CustomFetch";

export const useFetchTypesHospitals = () => {
  const [typesHospitals, setTypeshospitals] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypesHospitals = async () => {
      try {
        const response = await CustomFetch(`${import.meta.env.VITE_API_URL}hospital/types`, "GET");

        setTypeshospitals(response);
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

    fetchTypesHospitals();
  }, []);

  return { typesHospitals, loading, error };
};
