import { Colors } from "@/constants/Colors";
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { getContenidosConDemora } from "@/src/services/servicios-demora";
import AhorcadoHeader from "./components/AhorcadoHeader";
import AhorcadoGame from "./components/AhorcadoGame";
import { useRouter } from "expo-router";

export default function AhorcadoScreen() {
    const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [vidas, setVidas] = useState(5);
    const [score, setScore] = useState(0);
    const [contenidoActual, setContenidoActual] = useState<IContenidoAudiovisual | null>(null);
    const [contenidosUsados, setContenidosUsados] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (contenidos.length > 0 && !contenidoActual) {
            seleccionarNuevoContenido();
        }
    }, [contenidos, contenidoActual]);

    const cargarDatos = async () => {
        setIsLoading(true);
        try {
            const contenidosData = await getContenidosConDemora();
            setContenidos(contenidosData);
        } catch (error) {
            console.error("Error cargando datos:", error);
            // Fallback a datos locales si la API falla
            const { contenidosAudiovisuales } = await import('@/src/data/contenidosAudiovisuales');
            setContenidos(contenidosAudiovisuales);
        } finally {
            setIsLoading(false);
        }
    };

    const seleccionarNuevoContenido = () => {
        const contenidosDisponibles = contenidos.filter(c => !contenidosUsados.includes(c.id));
        
        if (contenidosDisponibles.length === 0) {
            // Si no hay más contenidos disponibles, resetear
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
            setContenidoActual(null); // Esto activará seleccionarNuevoContenido
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

    const handleExit = () => {
        router.push("/");
    };

    // Efecto para manejar game over cuando se acaban las vidas
    useEffect(() => {
        if (vidas <= 0) {
            router.push("/game-over");
        }
    }, [vidas, router]);

    // Si se acabaron las vidas, mostrar loading mientras navega
    if (vidas <= 0) {
        return (
            <View style={[styles.screenContainer, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.purpura} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={[styles.screenContainer, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.purpura} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <AhorcadoHeader 
                vidas={vidas}
                score={score}
                onExit={handleExit}
            />
            {contenidoActual && (
                <AhorcadoGame
                    contenido={contenidoActual}
                    onAdivinarTitulo={handleAdivinarTitulo}
                    onAdivinarLetra={handleAdivinarLetra}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: Colors.fondo,
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});