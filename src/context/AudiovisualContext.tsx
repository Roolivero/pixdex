import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';
import { ITipoContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { IGeneroContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import { getContenidosConDemora, getTiposConDemora, getGenerosConDemora } from '@/src/services/servicios-demora';

interface AudiovisualContextType {
  // Datos
  contenidos: IContenidoAudiovisual[];
  tipos: ITipoContenidoAudiovisual[];
  generos: IGeneroContenidoAudiovisual[];
  
  // Estados de carga
  isLoading: boolean;
  error: string | null;
  
  // Funciones
  refreshData: () => Promise<void>;
  getContenidoById: (id: number) => IContenidoAudiovisual | undefined;
  getTipoById: (id: number) => ITipoContenidoAudiovisual | undefined;
  getGeneroById: (id: number) => IGeneroContenidoAudiovisual | undefined;
  getGenerosByIds: (ids: number[]) => IGeneroContenidoAudiovisual[];
  getContenidosByTipo: (tipoId: number) => IContenidoAudiovisual[];
  getContenidosByGeneros: (generoIds: number[]) => IContenidoAudiovisual[];
  getContenidosFiltrados: (tipoIds: number[], generoIds: number[]) => IContenidoAudiovisual[];
}

const AudiovisualContext = createContext<AudiovisualContextType | undefined>(undefined);

interface AudiovisualProviderProps {
  children: ReactNode;
}

export function AudiovisualProvider({ children }: AudiovisualProviderProps) {
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("🔄 Cargando datos desde el contexto...");
      
      const [contenidosData, tiposData, generosData] = await Promise.all([
        getContenidosConDemora(),
        getTiposConDemora(),
        getGenerosConDemora()
      ]);
      
      console.log("✅ Datos cargados exitosamente:", {
        contenidos: contenidosData.length,
        tipos: tiposData.length,
        generos: generosData.length
      });
      
      setContenidos(contenidosData);
      setTipos(tiposData);
      setGeneros(generosData);
      
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
      
      // Fallback a datos locales si la API falla
      try {
        const { contenidosAudiovisuales } = await import('@/src/data/contenidosAudiovisuales');
        const { tiposContenidoAudiovisual } = await import('@/src/data/tiposContenidoAudiovisual');
        const { generosContenidoAudiovisual } = await import('@/src/data/generosContenidoAudiovisual');
        
        setContenidos(contenidosAudiovisuales);
        setTipos(tiposContenidoAudiovisual);
        setGeneros(generosContenidoAudiovisual);
        
        console.log("🔄 Usando datos locales como fallback");
      } catch (fallbackError) {
        console.error("❌ Error cargando datos locales:", fallbackError);
        setError("No se pudieron cargar los datos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Funciones de utilidad
  const getContenidoById = (id: number): IContenidoAudiovisual | undefined => {
    return contenidos.find(contenido => contenido.id === id);
  };

  const getTipoById = (id: number): ITipoContenidoAudiovisual | undefined => {
    return tipos.find(tipo => tipo.id === id);
  };

  const getGeneroById = (id: number): IGeneroContenidoAudiovisual | undefined => {
    return generos.find(genero => genero.id === id);
  };

  const getGenerosByIds = (ids: number[]): IGeneroContenidoAudiovisual[] => {
    return generos.filter(genero => ids.includes(genero.id));
  };

  const getContenidosByTipo = (tipoId: number): IContenidoAudiovisual[] => {
    return contenidos.filter(contenido => contenido.tipoId === tipoId);
  };

  const getContenidosByGeneros = (generoIds: number[]): IContenidoAudiovisual[] => {
    if (generoIds.length === 0) return contenidos;
    return contenidos.filter(contenido => 
      contenido.generos.some(generoId => generoIds.includes(generoId))
    );
  };

  const getContenidosFiltrados = (tipoIds: number[], generoIds: number[]): IContenidoAudiovisual[] => {
    let filtrados = contenidos;

    // Filtrar por tipos
    if (tipoIds.length > 0) {
      filtrados = filtrados.filter(contenido => tipoIds.includes(contenido.tipoId));
    }

    // Filtrar por géneros
    if (generoIds.length > 0) {
      filtrados = filtrados.filter(contenido => 
        contenido.generos.some(generoId => generoIds.includes(generoId))
      );
    }

    return filtrados;
  };

  const refreshData = async () => {
    await loadData();
  };

  const value: AudiovisualContextType = {
    contenidos,
    tipos,
    generos,
    isLoading,
    error,
    refreshData,
    getContenidoById,
    getTipoById,
    getGeneroById,
    getGenerosByIds,
    getContenidosByTipo,
    getContenidosByGeneros,
    getContenidosFiltrados,
  };

  return (
    <AudiovisualContext.Provider value={value}>
      {children}
    </AudiovisualContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAudiovisual() {
  const context = useContext(AudiovisualContext);
  if (context === undefined) {
    throw new Error('useAudiovisual debe ser usado dentro de un AudiovisualProvider');
  }
  return context;
} 