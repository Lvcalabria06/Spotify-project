const BASE_URL = 'http://localhost:3000/api';

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('spotify_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};
