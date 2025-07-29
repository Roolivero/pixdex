import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { PuntuacionesContent } from "@/src/screens/puntuaciones/components/PuntuacionesContent";

export default function PuntuacionesScreen() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    const handleIniciarJuego = () => {
        router.push("/ahorcado");
    };

    return (
        <View style={styles.container}>
            <ScreenHeader onBack={handleBack} />
            <View style={styles.content}>
                <PuntuacionesContent onIniciarJuego={handleIniciarJuego} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        padding: 20,
    },
    content: {
        flex: 1,
    },
}); 