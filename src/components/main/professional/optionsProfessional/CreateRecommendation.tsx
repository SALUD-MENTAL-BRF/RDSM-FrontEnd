import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { recomendationDto } from "../../../../types/recomendation.dto";
import { deleteRecommendationById, findRecommendations, createOrUpdate } from "./Request/fetchRecommendations";

interface CreateRecommendationProps {
  professionalId: number;
}

export const CreateRecommendation: React.FC<CreateRecommendationProps> = ({ professionalId }) => {
  const [formState, setFormState] = useState<recomendationDto>({
    description: "",
    title: "",
  });
  const { patientId } = useParams<{ patientId: string }>();
  const [recommendations, setRecommendations] = useState<recomendationDto[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecommendations();
  }, [professionalId, patientId]);

  const fetchRecommendations = async () => {
    if (professionalId && patientId) {
      setIsLoading(true);
      try {
        const fetchedRecommendations = await findRecommendations(Number(patientId), professionalId);
        setRecommendations(fetchedRecommendations);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch recommendations", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url = isEditing
      ? `${import.meta.env.VITE_API_URL}recommendation/${formState.id}`
      : `${import.meta.env.VITE_API_URL}recommendation/${patientId}/${professionalId}`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const data = await createOrUpdate(url, method, formState);

      if (data.statusCode === 400) {
        Swal.fire("Error", data.message[0], "error");
      } else {
        await Swal.fire("Success", `Recommendation ${isEditing ? "updated" : "created"} successfully`, "success");
        resetForm();
        fetchRecommendations();
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editRecommendation = (recommendation: recomendationDto) => {
    setFormState(recommendation);
    setIsEditing(true);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormState({ description: "", title: "" });
    setIsEditing(false);
  };

  const deleteRecommendation = async (recommendationId: number) => {
    const result = await Swal.fire({
      text: "Está seguro de que desea eliminar esta recomendación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar.",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await deleteRecommendationById(recommendationId);
        Swal.fire("Deleted", "La recomendación ha sido eliminada.", "success");
        fetchRecommendations();
      } catch (error) {
        Swal.fire("Error", "No se eliminó la recomendación.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="row">
      <section className="col-12 col-lg-6 mt-4">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center fw-bold mb-0">Recomendaciones</h4>
          </div>
          <div className="card-body">
            {isLoading ? (
              <div className="text-center">cargando recomendaciones...</div>
            ) : recommendations.length === 0 ? (
              <p className="text-center text-muted">No hay recomendaciones.</p>
            ) : (
              recommendations.map((recommendation) => (
                <div key={recommendation.id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{recommendation.title}</h5>
                    <p className="card-text">{recommendation.description}</p>
                    <div className="text-end">
                      <button
                        onClick={() => editRecommendation(recommendation)}
                        className="btn btn-sm btn-outline-primary me-2"
                        aria-label="Edit recommendation"
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button
                        onClick={() => deleteRecommendation(recommendation.id!)}
                        className="btn btn-sm btn-outline-danger"
                        aria-label="Delete recommendation"
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="col-12 col-lg-6 mt-4">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center fw-bold mb-0">
              {isEditing ? "Editar" : "Crear"} Recomendación
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {isEditing ? "Actualizar" : "Crear"}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};