import { Platform, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import AhorcadoHeader from "@/src/screens/ahorcado/components/AhorcadoHeader";
import AhorcadoGame from "@/src/screens/ahorcado/components/AhorcadoGame";
import { useRouter } from "expo-router";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { LoadingContainer } from "@/src/components/LoadingContainer";
import { ErrorContainer } from "@/src/components/ErrorContainer";
import { useAhorcadoGame } from "@/src/hooks/useAhorcadoGame";
import { ScreenContainer } from "@/src/components/ScreenContainer";

export default function AhorcadoScreen() {
    const router = useRouter();
    const { contenidos, isLoading, error } = useAudiovisual();
    const {
        vidas,
        score,
        contenidoActual,
        handleAdivinarTitulo,
        handleAdivinarLetra,
        isGameOver
    } = useAhorcadoGame({ contenidos });

    const handleExit = () => {
        router.push("/");
    };

    useEffect(() => {
        if (isGameOver) {
            router.push("/game-over");
        }
    }, [isGameOver, router]);

    if (isGameOver) {
        return <LoadingContainer />;
    }

    if (isLoading) {
        return <LoadingContainer message="Cargando juego..." />;
    }

    if (error) {
        return (
            <ErrorContainer 
                message={`Error: ${error}`} 
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <ScreenContainer>
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
        </ScreenContainer>
    );
}

