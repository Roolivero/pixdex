import { useState, useEffect } from "react";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { useUser } from "@/src/context/UserContext";
import { supabasePuntuaciones } from "@/src/services/supabasePuntuaciones";

interface UseAhorcadoGameProps {
    contenidos: IContenidoAudiovisual[];
}

export function useAhorcadoGame({ contenidos }: UseAhorcadoGameProps) {
    const [vidas, setVidas] = useState(5);
    const [score, setScore] = useState(0);
    const [contenidoActual, setContenidoActual] = useState<IContenidoAudiovisual | null>(null);
    const [contenidosUsados, setContenidosUsados] = useState<number[]>([]);
    const [isSavingScore, setIsSavingScore] = useState(false);
    const [hasGameEnded, setHasGameEnded] = useState(false);
    
    const { user } = useUser();

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

    const saveScore = async () => {
        if (!user || score === 0) {
            console.log('No se puede guardar puntuación: usuario no autenticado o score 0');
            return;
        }
        
        setIsSavingScore(true);
        try {
            const playerName = user.user_metadata?.username || user.email || 'Jugador';
            
            await supabasePuntuaciones.upsertPuntuacion(user.id, playerName, score);
            console.log('Puntuación guardada exitosamente');
        } catch (error) {
            console.error('Error guardando puntuación:', error);
        } finally {
            setIsSavingScore(false);
        }
    };

    const resetGame = () => {
        setVidas(5);
        setScore(0);
        setContenidosUsados([]);
        setContenidoActual(null);
        setHasGameEnded(false);
    };

    useEffect(() => {
        if (vidas <= 0 && score > 0 && user && !hasGameEnded) {
            setHasGameEnded(true);
            saveScore();
        }
    }, [vidas, score, user, hasGameEnded]);

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
        isGameOver: vidas <= 0,
        isSavingScore
    };
} 