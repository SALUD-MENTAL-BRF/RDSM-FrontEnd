import { recomendationDto } from "../../../../../types/recomendation.dto";

export const findRecommendations = async (patientId: number, professionalId: number) => {
    const responseRecommendation = await fetch(`${import.meta.env.VITE_API_URL}recommendation/${patientId}/${professionalId}`)
    const recommendation = await responseRecommendation.json()
    return recommendation
};

export const createOrUpdate = async (url:string, method: string, formData:recomendationDto) => {
    const response = await fetch(url,{
        method: method,
        body: JSON.stringify(formData),
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}

export const deleteRecommendationById = async (recomendationId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}recommendation/${recomendationId}`,{
        method: 'DELETE'
    })

    return response.json()
};