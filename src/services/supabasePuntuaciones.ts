import { supabase } from '@/src/lib/supabase';
import { PuntuacionAhorcado, TopPuntuacion } from '@/src/lib/supabase';

export const supabasePuntuaciones = {
  // Obtener top 10 puntuaciones
  async getTopPuntuaciones(): Promise<TopPuntuacion[]> {
    const { data, error } = await supabase
      .rpc('get_top_puntuaciones_ahorcado', { p_limit: 10 });
    
    if (error) throw error;
    return data || [];
  },

  // Obtener puntuación del usuario actual
  async getUserPuntuacion(userId: string): Promise<PuntuacionAhorcado | null> {
    const { data, error } = await supabase
      .rpc('get_user_puntuacion_ahorcado', { p_user_id: userId });
    
    if (error) throw error;
    return data?.[0] || null;
  },

  // Guardar/actualizar puntuación
  async upsertPuntuacion(userId: string, playerName: string, score: number): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('upsert_puntuacion_ahorcado', {
        p_user_id: userId,
        p_player_name: playerName,
        p_score: score,
      });
    
    if (error) throw error;
    return data;
  },
};
