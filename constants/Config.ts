export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8081";

// Configuración de Supabase
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL 
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

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

export const SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  timeout: 10000,
  retries: 2
};

export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL}/tipos`, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}; 