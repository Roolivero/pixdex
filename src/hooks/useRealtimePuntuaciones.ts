import { useState, useEffect, useCallback } from 'react';
import { TopPuntuacion } from '@/src/lib/supabase';
import { supabasePuntuaciones } from '@/src/services/supabasePuntuaciones';
import { subscribeToPuntuaciones, RealtimePayload } from '@/src/services/supabaseRealtime';

export function useRealtimePuntuaciones() {
  const [puntuaciones, setPuntuaciones] = useState<TopPuntuacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const cargarPuntuaciones = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await supabasePuntuaciones.getTopPuntuaciones();
      setPuntuaciones(data);
    } catch (error) {
      console.error('Error cargando puntuaciones:', error);
      setError('Error al cargar puntuaciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRealtimeChange = useCallback((payload: RealtimePayload) => {
    console.log('🎯 Realtime change detected:', payload);
    console.log('📊 Payload type:', payload.type);
    console.log('📊 New score:', payload.new?.score);
    console.log('📊 Old score:', payload.old?.score);
    
    // Debounce para evitar múltiples recargas
    const timeoutId = setTimeout(() => {
      console.log('🔄 Recargando puntuaciones después de debounce');
      cargarPuntuaciones();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [cargarPuntuaciones]);

  const handleRealtimeStatus = useCallback((status: 'connected' | 'disconnected') => {
    console.log('🔌 Realtime status changed:', status);
    setIsRealtimeConnected(status === 'connected');
    
    if (status === 'connected') {
      setReconnectAttempts(0); // Reset intentos cuando se conecta
    }
    
    // Si se desconecta, intentar reconectar
    if (status === 'disconnected' && reconnectAttempts < 3) {
      console.log('🔄 Realtime desconectado, intentando reconectar... (intento', reconnectAttempts + 1, ')');
      setReconnectAttempts(prev => prev + 1);
      
      setTimeout(() => {
        cargarPuntuaciones();
      }, 1000 * (reconnectAttempts + 1)); // Backoff exponencial
    }
  }, [cargarPuntuaciones, reconnectAttempts]);

  useEffect(() => {
    console.log('🔄 Hook useRealtimePuntuaciones montado');
    
    let unsubscribe: (() => void) | null = null;
    
    const setupSubscription = () => {
      // Cargar puntuaciones iniciales
      cargarPuntuaciones();
      
      // Suscribirse a cambios en tiempo real
      unsubscribe = subscribeToPuntuaciones(handleRealtimeChange, handleRealtimeStatus);
    };
    
    setupSubscription();
    
    // Cleanup al desmontar
    return () => {
      console.log('🔄 Hook useRealtimePuntuaciones desmontado');
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // Removemos las dependencias para evitar re-suscripciones

  return {
    puntuaciones,
    isLoading,
    error,
    isRealtimeConnected,
    refreshPuntuaciones: cargarPuntuaciones
  };
}
