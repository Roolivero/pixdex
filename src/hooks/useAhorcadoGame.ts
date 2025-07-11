import { useState, useEffect } from "react";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";

interface UseAhorcadoGameProps {
    contenidos: IContenidoAudiovisual[];
}

export function useAhorcadoGame({ contenidos }: UseAhorcadoGameProps) {
    const [vidas, setVidas] = useState(5);
    const [score, setScore] = useState(0);
    const [contenidoActual, setContenidoActual] = useState<IContenidoAudiovisual | null>(null);
    const [contenidosUsados, setContenidosUsados] = useState<number[]>([]);

    const seleccionarNuevoContenido = () => {
        const contenidosDisponibles = contenidos.filter(c => !contenidosUsados.includes(c.id));
        
        if (contenidosDisponibles.length === 0) {
            setContenidosUsados([]);
            const contenidoAleatorio = contenidos[Math.floor(Math.random() * contenidos.length)];
            setContenidoActual(contenidoAleatorio);
        } else {
            const contenidoAleatorio = contenidosDisponibles[Math.floor(Math.random() * contenidosDisponibles.length)];
            setContenidoActual(contenidoAleatorio);
        }
    };

    const handleAdivinarTitulo = (tituloAdivinado: string) => {
        if (!contenidoActual) return;

        const esCorrecto = tituloAdivinado.toLowerCase().trim() === contenidoActual.nombre.toLowerCase().trim();
        
        if (esCorrecto) {
            setScore(prev => prev + 1);
            setContenidosUsados(prev => [...prev, contenidoActual.id]);
            setContenidoActual(null);
        } else {
            setVidas(prev => prev - 1);
        }
    };

    const handleAdivinarLetra = (letra: string) => {
        if (!contenidoActual) return;

        const letraEnTitulo = contenidoActual.nombre.toLowerCase().includes(letra.toLowerCase());
        
        if (!letraEnTitulo) {
            setVidas(prev => prev - 1);
        }
    };

    const resetGame = () => {
        setVidas(5);
        setScore(0);
        setContenidosUsados([]);
        setContenidoActual(null);
    };

    useEffect(() => {
        if (contenidos.length > 0 && !contenidoActual) {
            seleccionarNuevoContenido();
        }
    }, [contenidos, contenidoActual]);

    return {
        vidas,
        score,
        contenidoActual,
        handleAdivinarTitulo,
        handleAdivinarLetra,
        resetGame,
        isGameOver: vidas <= 0
    };
} 