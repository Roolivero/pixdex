import { Colors } from "@/constants/Colors";
import { StyleSheet, View, Platform } from "react-native";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GameOverScreen() {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 5 : 2;

    const handleVolverAPuntuaciones = () => {
        router.push("/mejores-puntuaciones");
    };

    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={styles.content}>
                <TextPressStart2P style={styles.gameOverText}>
                    GAME OVER
                </TextPressStart2P>
                
                <TextPressStart2P style={styles.messageText}>
                    ¡Has perdido todas las vidas!
                </TextPressStart2P>
                
                <TextPressStart2P style={styles.subMessageText}>
                    Mejor suerte la próxima vez
                </TextPressStart2P>
            </View>

            <View style={styles.buttonContainer}>
                <Boton
                    onPress={handleVolverAPuntuaciones}
                    texto="VOLVER"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        marginBottom: 50,
    },
    gameOverText: {
        fontSize: 32,
        color: Colors.purpura,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    messageText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subMessageText: {
        fontSize: 14,
        color: Colors.purpuraClaro,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        alignContent: 'center',
        paddingHorizontal: 99
    },
}); 