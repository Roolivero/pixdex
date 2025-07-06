import { IContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';

export function filtrarContenidos(
    contenidos: IContenidoAudiovisual[],
    tiposSeleccionados: number[],
    generosSeleccionados: number[]
): IContenidoAudiovisual[] {
    return contenidos.filter(contenido => {
        if (tiposSeleccionados.length === 0 && generosSeleccionados.length === 0) {
            return true;
        }

        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(contenido.tipoId);

        const cumpleGenero = generosSeleccionados.length === 0 || 
            contenido.generos.some(generoId => generosSeleccionados.includes(generoId));

        return cumpleTipo && cumpleGenero;
    });
} 