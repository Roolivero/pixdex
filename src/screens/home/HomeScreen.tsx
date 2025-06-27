import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";
import { AudioVisualScroll } from "./components/AudioVisualScroll";
import { ROUTES } from "@/src/navigate/routes";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export function HomeScreen() {
    return (
        <ScrollView style={styles.screenContainer}>
            <HomeHeader />
            <View style={styles.buttonContainer}>
                <GameButton titulo="Desafío del Ahorcado" descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?" fondo={Colors.purpura} url={ROUTES.AHORCADO}/>
                <GameButton titulo="Pixel Reveal" descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!" fondo={Colors.verde} url={ROUTES.PIXEL_REVEAL}/>
            </View>
            <View style={styles.contenedorScroll}>
                {tiposContenidoAudiovisual.map(tipo => (
                    <AudioVisualScroll key={tipo.id} tipoId={tipo.id} />
                ))}
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    screenContainer: { 
        flex: 1,
        backgroundColor: Colors.fondo 
    },
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
