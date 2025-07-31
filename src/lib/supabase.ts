import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const expoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

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
    storage: expoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
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
