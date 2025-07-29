import { Platform, StyleSheet, View } from "react-native";
import DetailCard from "./components/DetailCard";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { LoadingContainer } from "@/src/components/LoadingContainer";
import { ErrorContainer } from "@/src/components/ErrorContainer";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { ScreenHeader } from "@/src/components/ScreenHeader";
import { useRouter } from "expo-router";

export interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    const router = useRouter();
    const { isLoading, error, getContenidoById } = useAudiovisual();
    const contenido = getContenidoById(parseInt(audioVisualId));

    const handleBack = () => {
        router.back();
    };

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
            <ScreenHeader onBack={handleBack} />
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



const styles = StyleSheet.create({});
