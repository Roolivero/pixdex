import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { useAudiovisual } from "@/src/context/AudiovisualContext";

export default function PixelRevealScreen() {
    const { isLoading, error, contenidos } = useAudiovisual();

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.purpura} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <TextPressStart2P style={styles.errorText}>Error: {error}</TextPressStart2P>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextPressStart2P style={styles.title}>Pixel Reveal</TextPressStart2P>
            <TextPressStart2P style={styles.subtitle}>
                Contenidos disponibles: {contenidos.length}
            </TextPressStart2P>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: Colors.purpura,
        marginBottom: 20
    },
    subtitle: {
        fontSize: 16,
        color: Colors.verde,
        textAlign: 'center'
    },
    errorText: {
        color: Colors.purpura,
        fontSize: 16,
        textAlign: 'center',
        padding: 20
    }
});