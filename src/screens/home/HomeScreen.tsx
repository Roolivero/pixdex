import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";
import { AudioVisualScroll } from "./components/AudioVisualScroll";
import { ROUTES } from "@/src/navigate/routes";
import { useState } from "react";
import { ModalFiltros } from "@/src/components/ModalFiltros";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { LoadingContainer } from "@/src/components/LoadingContainer";
import { ErrorContainer } from "@/src/components/ErrorContainer";
import { useFilters } from "@/src/hooks/useFilters";

export function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    
    const { 
        contenidos, 
        tipos, 
        generos, 
        isLoading, 
        error
    } = useAudiovisual();

    const {
        contenidosFiltrados,
        tiposParaMostrar,
        generosSeleccionados,
        handleApplyFilters,
        hasActiveFilters
    } = useFilters();

    const handleOpenFilters = () => {
        console.log("Abriendo modal con datos:", {
            tipos: tipos.length,
            generos: generos.length,
            contenidos: contenidos.length
        });
        setModalVisible(true);
    };

    if (isLoading) {
        return <LoadingContainer message="Cargando contenidos..." />;
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
        <ScrollView style={{ flex: 1, backgroundColor: Colors.fondo }}>
            <HomeHeader onOpenFilters={handleOpenFilters} />
            <View style={styles.buttonContainer}>
                <GameButton titulo="Desafío del Ahorcado" descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?" fondo={Colors.purpura} url={ROUTES.AHORCADO}/>
                <GameButton titulo="Pixel Reveal" descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!" fondo={Colors.verde} url={ROUTES.PIXEL_REVEAL}/>
            </View>
            <View style={styles.contenedorScroll}>
                {tiposParaMostrar.map(tipo => (
                    <AudioVisualScroll 
                        key={tipo.id} 
                        tipoId={tipo.id} 
                        contenidosFiltrados={contenidosFiltrados}
                    />
                ))}
            </View>

            <ModalFiltros
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onApplyFilters={handleApplyFilters}
                tipos={tipos}
                generos={generos}
                tiposActuales={tiposParaMostrar.map(t => t.id)}
                generosActuales={generosSeleccionados}
            />
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        gap: 20
    },
    contenedorScroll: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        gap: 20
    }
});
