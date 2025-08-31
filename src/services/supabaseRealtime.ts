import { supabase } from '@/src/lib/supabase';
import { PuntuacionAhorcado } from '@/src/lib/supabase';
import { Platform } from 'react-native';

export type RealtimePayload = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  new?: PuntuacionAhorcado;
  old?: PuntuacionAhorcado;
};

export function subscribeToPuntuaciones(
  onPuntuacionChange: (payload: RealtimePayload) => void,
  onStatusChange?: (status: 'connected' | 'disconnected') => void
) {
  const channelId = `puntuaciones-realtime-${Date.now()}-${Math.random()}`;
  console.log('🔌 Creando suscripción realtime:', channelId, 'Platform:', Platform.OS);
  
  const channel = supabase
    .channel(channelId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'puntuaciones_ahorcado'
      },
      (payload: any) => {
        console.log('Realtime puntuación change:', payload);
        
        const realtimePayload: RealtimePayload = {
          type: payload.eventType,
          new: payload.new,
          old: payload.old
        };
        
        onPuntuacionChange(realtimePayload);
      }
    )
    .subscribe((status) => {
      console.log('🔌 Realtime subscription status:', status, 'Channel:', channelId);
      if (onStatusChange) {
        onStatusChange(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      }
    });

  return () => {
    console.log('🔌 Desuscribiendo de puntuaciones realtime:', channelId);
    try {
      supabase.removeChannel(channel);
    } catch (error) {
      console.log('🔌 Error al desuscribir:', error);
    }
  };
}

export function subscribeToUserPuntuacion(
  userId: string,
  onPuntuacionChange: (payload: RealtimePayload) => void
) {
  const channel = supabase
    .channel(`user-puntuacion-${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'puntuaciones_ahorcado',
        filter: `user_id=eq.${userId}`
      },
      (payload: any) => {
        console.log('Realtime user puntuación change:', payload);
        
        const realtimePayload: RealtimePayload = {
          type: payload.eventType,
          new: payload.new,
          old: payload.old
        };
        
        onPuntuacionChange(realtimePayload);
      }
    )
    .subscribe();

  return () => {
    console.log(`Desuscribiendo de user puntuación ${userId}`);
    supabase.removeChannel(channel);
  };
}
