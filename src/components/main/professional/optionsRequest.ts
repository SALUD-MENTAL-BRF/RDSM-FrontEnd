export const removeRequest = async (id: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}request-patient/${id}`,{
        method: 'DELETE'
    });

    return  response
};