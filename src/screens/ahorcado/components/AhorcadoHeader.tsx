import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { StyleSheet, Platform, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

interface AhorcadoHeaderProps {
    vidas: number;
    score: number;
    onExit: () => void;
}

export default function AhorcadoHeader({ vidas, score, onExit }: AhorcadoHeaderProps) {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 5 : 2;

    const renderCorazones = () => {
        const corazones = [];
        for (let i = 0; i < 5; i++) {
            corazones.push(
                <MaterialIcons
                    key={i}
                    name={i < vidas ? "favorite" : "favorite-border"}
                    size={24}
                    color={Colors.purpura}
                    style={styles.corazon}
                />
            );
        }
        return corazones;
    };

    return (
        <View style={[styles.header, { paddingTop }]}>
            {/* Botón EXIT a la izquierda */}
            <View style={styles.leftSection}>
                <Boton onPress={onExit} icon="exit-to-app" texto="EXIT" fontSize={8} />
            </View>

            {/* Corazones en el centro */}
            <View style={styles.centerSection}>
                <View style={styles.corazonesContainer}>
                    {renderCorazones()}
                </View>
            </View>

            {/* Nombre del jugador y score a la derecha */}
            <View style={styles.rightSection}>
                <Text style={styles.playerName}>JUGADOR</Text>
                <Text style={styles.score}>SCORE: {score}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    corazonesContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    corazon: {
        marginHorizontal: 1,
    },
    playerName: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'right',
    },
    score: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'right',
        marginTop: 5,
    },
}); 