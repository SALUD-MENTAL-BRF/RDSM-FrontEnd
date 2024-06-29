export const CustomFetch = async (url: string, req: string, payload: object) => {
    try {
        const options = {
        method: req,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
