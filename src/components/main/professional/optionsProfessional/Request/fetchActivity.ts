export const linkedActivityWithPatient = async (patientId: string, data: Array<number>) => {
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

export const unlinkActivityWithPatient = async (patientId: string, activityId:number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}activity/${patientId}/${activityId}`,{
        method: 'DELETE'
    });
    return response;
}

export const findAllActivities = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}activity`)
    return await response.json()
};

export const findActivitiesLinked = async (patientId:string, professionalId: number | string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}activity/${patientId}/${professionalId}`)
    return await response.json()
};  