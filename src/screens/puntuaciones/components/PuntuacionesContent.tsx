import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { ScreenCard } from "@/src/components/ScreenCard";
import { TopPuntuacion } from "@/src/lib/supabase";
import { supabasePuntuaciones } from "@/src/services/supabasePuntuaciones";

interface Puntuacion {
    id: string;
    nombre: string;
    puntuacion: number;
}

const puntuacionesMock: Puntuacion[] = [
    { id: "1", nombre: "Jugador Demo", puntuacion: 15 },
    { id: "2", nombre: "Gamer123", puntuacion: 12 },
    { id: "3", nombre: "PlayerX", puntuacion: 10 },
    { id: "4", nombre: "Adivinador", puntuacion: 8 },
    { id: "5", nombre: "NuevoJugador", puntuacion: 6 },
];

interface MejoresPuntuacionesContentProps {
    onIniciarJuego: () => void;
}

export function PuntuacionesContent({ onIniciarJuego }: MejoresPuntuacionesContentProps) {
    const [puntuaciones, setPuntuaciones] = useState<TopPuntuacion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        cargarPuntuaciones();
    }, []);

    const cargarPuntuaciones = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const data = await supabasePuntuaciones.getTopPuntuaciones();
            setPuntuaciones(data);
        } catch (error) {
            console.error('Error cargando puntuaciones:', error);
            setError('Error al cargar puntuaciones');
            setPuntuaciones(puntuacionesMock.map((p, index) => ({
                id: p.id,
                player_name: p.nombre,
                score: p.puntuacion,
                created_at: new Date().toISOString(),
                rank_position: index + 1
            })));
        } finally {
            setIsLoading(false);
        }
    };

    const renderPuntuacion = (puntuacion: TopPuntuacion, index: number) => (
        <View key={puntuacion.id} style={styles.puntuacionItem}>
            <Text style={styles.nombre}>{puntuacion.player_name}</Text>
            <Text style={styles.puntuacion}>{puntuacion.score}</Text>
        </View>
    );

    return (
        <ScreenCard>
            <TextPressStart2P style={styles.titulo}>
                Desafío del Ahorcado
            </TextPressStart2P>
            
            <View style={styles.botonContainer}>
                <Boton 
                    onPress={onIniciarJuego} 
                    texto="INICIAR JUEGO" 
                    fontSize={15}
                    borderColor={Colors.verde}
                />
            </View>

            <TextPressStart2P style={styles.subtitulo}>
                Mejores jugadores
            </TextPressStart2P>

            <View style={styles.puntuacionesContainer}>
                {isLoading ? (
                    <Text style={styles.loadingText}>Cargando puntuaciones...</Text>
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : puntuaciones.length === 0 ? (
                    <Text style={styles.emptyText}>No hay puntuaciones disponibles</Text>
                ) : (
                    puntuaciones.map((puntuacion, index) => renderPuntuacion(puntuacion, index))
                )}
            </View>
        </ScreenCard>
    );
}

const styles = StyleSheet.create({
    titulo: {
        padding: 10,
        color: Colors.purpura,
        fontSize: 20,
        textAlign: "center",
    },
    botonContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    subtitulo: {
        fontSize: 16,
        color: Colors.verde,
        padding: 10,
        textAlign: "center",
    },
    puntuacionesContainer: {
        backgroundColor: Colors.grisOscuro,
        padding: 15,
        marginTop: 10,
    },
    puntuacionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    nombre: {
        fontSize: 14,
        color: "#fff",
        flex: 1,
    },
    puntuacion: {
        fontSize: 14,
        color: Colors.verde,
        fontWeight: "bold",
    },
    loadingText: {
        fontSize: 14,
        color: Colors.verde,
        textAlign: "center",
        padding: 10,
    },
    errorText: {
        fontSize: 14,
        color: "#ff6b6b",
        textAlign: "center",
        padding: 10,
    },
    emptyText: {
        fontSize: 14,
        color: "#ccc",
        textAlign: "center",
        padding: 10,
    },
}); 