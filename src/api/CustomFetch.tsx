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
      ...headers,
    },
    body: method !== 'GET' && method !== 'HEAD' && body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorResponse = await response.text().catch(() => null); 
    const errorMessage = errorResponse || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json(); 
  }

  
  return await response.text();
};
