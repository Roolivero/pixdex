export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8081";

export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 10000,
  retries: 2,
  endpoints: {
    contenidos: '/contenidos',
    tipos: '/tipos',
    generos: '/generos'
  }
};

export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/tipos`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  } catch (error) {
    console.log('🔴 API no disponible:', error);
    return false;
  }
}; 