export const findCategoryByDisorder = async (disorderId: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}category/${disorderId}`)
    return await response.json()
};
