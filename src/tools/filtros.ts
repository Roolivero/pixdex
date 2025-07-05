import { IContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';

export function filtrarContenidos(
    contenidos: IContenidoAudiovisual[],
    tiposSeleccionados: number[],
    generosSeleccionados: number[]
): IContenidoAudiovisual[] {
    return contenidos.filter(contenido => {
        // Si no hay filtros seleccionados, mostrar todo
        if (tiposSeleccionados.length === 0 && generosSeleccionados.length === 0) {
            return true;
        }

        // Filtrar por tipos (si hay tipos seleccionados)
        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(contenido.tipoId);

        // Filtrar por géneros (si hay géneros seleccionados)
        const cumpleGenero = generosSeleccionados.length === 0 || 
            contenido.generos.some(generoId => generosSeleccionados.includes(generoId));

        // Debe cumplir AMBOS filtros (AND lógico)
        return cumpleTipo && cumpleGenero;
    });
} 