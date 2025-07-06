import { useState, useMemo } from 'react';
import { useAudiovisual } from '@/src/context/AudiovisualContext';

export function useFilters() {
    const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([]);
    const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);
    const { getContenidosFiltrados, tipos } = useAudiovisual();

    const contenidosFiltrados = useMemo(() => {
        return getContenidosFiltrados(tiposSeleccionados, generosSeleccionados);
    }, [getContenidosFiltrados, tiposSeleccionados, generosSeleccionados]);

    const tiposParaMostrar = useMemo(() => {
        return tiposSeleccionados.length > 0
            ? tipos.filter(t => tiposSeleccionados.includes(t.id))
            : tipos;
    }, [tipos, tiposSeleccionados]);

    const handleApplyFilters = (tipos: number[], generos: number[]) => {
        setTiposSeleccionados(tipos);
        setGenerosSeleccionados(generos);
    };

    const clearFilters = () => {
        setTiposSeleccionados([]);
        setGenerosSeleccionados([]);
    };

    const hasActiveFilters = tiposSeleccionados.length > 0 || generosSeleccionados.length > 0;

    return {
        tiposSeleccionados,
        generosSeleccionados,
        contenidosFiltrados,
        tiposParaMostrar,
        handleApplyFilters,
        clearFilters,
        hasActiveFilters
    };
} 