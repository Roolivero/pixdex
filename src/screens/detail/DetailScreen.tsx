import { Platform, StyleSheet, View } from "react-native";
import DetailCard from "./components/DetailCard";
import DetailHeader from "./components/DetailHeader";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { LoadingContainer } from "@/src/components/LoadingContainer";
import { ErrorContainer } from "@/src/components/ErrorContainer";
import { ScreenContainer } from "@/src/components/ScreenContainer";

export interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    const { isLoading, error, getContenidoById } = useAudiovisual();
    const contenido = getContenidoById(parseInt(audioVisualId));

    if (isLoading) {
        return <LoadingContainer message="Cargando contenido..." />;
    }

    if (error) {
        return (
            <ErrorContainer 
                message={`Error: ${error}`} 
                onRetry={() => window.location.reload()}
            />
        );
    }

    if (!contenido) {
        return (
            <ErrorContainer 
                message="Contenido no encontrado" 
                showRetryButton={false}
            />
        );
    }

    return (
        <ScreenContainer>
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
        </ScreenContainer>
    )
}



// Styles
const styles = StyleSheet.create({
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    },
});
