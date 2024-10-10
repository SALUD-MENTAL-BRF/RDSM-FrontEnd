export const likedActivityWithPatient = async (patientId: string, data: Array<number>) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}activity/${patientId}`,{
        method: 'POST',
        body: JSON.stringify({
            activityIds: data
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    return response
};