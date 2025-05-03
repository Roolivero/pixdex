import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";

export function HomeScreen() {
    return (
        <View style={styles.screenContainer}>
            <HomeHeader />
            <View style={styles.buttonContainer}>
                <GameButton titulo="Desafío del Ahorcado" descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?" fondo={Colors.purpura}/>
                <GameButton titulo="Pixel Reveal" descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!" fondo={Colors.verde}/>
            </View>
        </View>
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
    }
});
