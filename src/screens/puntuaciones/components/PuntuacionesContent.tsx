import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { ScreenCard } from "@/src/components/ScreenCard";

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
    const renderPuntuacion = (puntuacion: Puntuacion, index: number) => (
        <View key={puntuacion.id} style={styles.puntuacionItem}>
            <Text style={styles.nombre}>{puntuacion.nombre}</Text>
            <Text style={styles.puntuacion}>{puntuacion.puntuacion}</Text>
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
                {puntuacionesMock.map((puntuacion, index) => renderPuntuacion(puntuacion, index))}
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
}); 