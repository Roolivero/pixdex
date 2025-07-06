import { Colors } from "@/constants/Colors";
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import DetailCard from "./components/DetailCard";
import DetailHeader from "./components/DetailHeader";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";

export interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    const { isLoading, error, getContenidoById } = useAudiovisual();
    const contenido = getContenidoById(parseInt(audioVisualId));

    if (isLoading) {
        return (
            <View style={[styles.contenedorPrincipal, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.purpura} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.contenedorPrincipal, styles.loadingContainer]}>
                <TextPressStart2P style={styles.errorText}>Error: {error}</TextPressStart2P>
            </View>
        );
    }

    if (!contenido) {
        return (
            <View style={[styles.contenedorPrincipal, styles.loadingContainer]}>
                <TextPressStart2P style={styles.errorText}>Contenido no encontrado</TextPressStart2P>
            </View>
        );
    }

    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorHeader}>
                <DetailHeader/>
            </View>
            {
                Platform.OS === "web" ? (
                    <View style={{ alignSelf: "center" }}>
                        <DetailCard audioVisualId={audioVisualId} />
                    </View>
                ) : (
                    <DetailCard audioVisualId={audioVisualId} />
                )
            }
        </ScrollView>
    )
}



// Styles
const styles = StyleSheet.create({

    contenedorPrincipal: {
        backgroundColor: Colors.fondo,
        flex: 1,
        padding: 20,
    },
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: Colors.purpura,
        fontSize: 16,
        textAlign: 'center',
        padding: 20
    }
});
