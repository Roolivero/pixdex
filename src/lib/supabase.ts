import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Adaptador que funciona tanto en web como en móvil
const createStorageAdapter = () => {
  if (Platform.OS === 'web') {
    // En web, usar localStorage
    return {
      getItem: async (key: string) => {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          console.warn('Error getting item from localStorage:', error);
          return null;
        }
      },
      setItem: async (key: string, value: string) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          console.warn('Error setting item in localStorage:', error);
        }
      },
      removeItem: async (key: string) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn('Error removing item from localStorage:', error);
        }
      },
    };
  } else {
    // En móvil, usar expo-secure-store
    return {
      getItem: async (key: string) => {
        try {
          return await SecureStore.getItemAsync(key);
        } catch (error) {
          console.warn('Error getting item from SecureStore:', error);
          return null;
        }
      },
      setItem: async (key: string, value: string) => {
        try {
          await SecureStore.setItemAsync(key, value);
        } catch (error) {
          console.warn('Error setting item in SecureStore:', error);
        }
      },
      removeItem: async (key: string) => {
        try {
          await SecureStore.deleteItemAsync(key);
        } catch (error) {
          console.warn('Error removing item from SecureStore:', error);
        }
      },
    };
  }
};

const storageAdapter = createStorageAdapter();

console.log('🌐 Platform:', Platform.OS);
console.log('🔧 Storage adapter:', Platform.OS === 'web' ? 'localStorage' : 'expo-secure-store');

// Validar que las variables de entorno estén definidas
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('EXPO_PUBLIC_SUPABASE_URL is required. Check your .env file.');
}
if (!supabaseAnonKey) {
  throw new Error('EXPO_PUBLIC_SUPABASE_ANON_KEY is required. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web', // Habilitar solo en web
  },
  realtime: {
    params: {
      eventsPerSecond: 10, // Limitar eventos por segundo en web
    },
  },
});

export interface PuntuacionAhorcado {
  id: string;
  user_id: string;
  player_name: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface TopPuntuacion {
  id: string;
  player_name: string;
  score: number;
  created_at: string;
  rank_position: number;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
  };
}
