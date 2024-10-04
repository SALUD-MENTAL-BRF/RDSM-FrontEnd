export const CustomFetch = async (
  url: string, 
  method: string, 
  body?: any, 
  headers?: Record<string, string>
) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Agrega cabeceras adicionales si las hay
    },
    body: method !== 'GET' && method !== 'HEAD' && body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    const errorMessage = errorResponse?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return await response.json();
};
