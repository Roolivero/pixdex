// Configuración de la API
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8081";

// Configuración para diferentes entornos
export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 10000, // 10 segundos
  retries: 2,
  endpoints: {
    contenidos: '/contenidos',
    tipos: '/tipos',
    generos: '/generos'
  }
};

// Función para verificar si la API está disponible
export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/tipos`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 segundos timeout
    });
    return response.ok;
  } catch (error) {
    console.log('🔴 API no disponible:', error);
    return false;
  }
}; 