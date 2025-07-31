import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { TouchableOpacity, Text, StyleSheet, View, Platform, Alert } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";
import { useUser } from "@/src/context/UserContext";

interface GameButtonProps {
    titulo: string,
    descripcion: string,
    fondo: string,
    url: Href,
    onLoginRequired?: () => void
}

export function GameButton({ titulo, descripcion, fondo, url, onLoginRequired }: GameButtonProps) {
    const router = useRouter();
    const { isLoggedIn } = useUser();
    
    const handlePress = () => {
        if (!isLoggedIn) {
            Alert.alert(
                "Acceso Denegado",
                "Debes iniciar sesión para acceder a los juegos.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Iniciar Sesión", onPress: () => {
                        onLoginRequired?.();
                    }}
                ]
            );
            return;
        }
        
        router.push(url);
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: fondo }]} onPress={handlePress} >
            <View style={styles.contentContainer}>
                <TextPressStart2P style={styles.title}>{titulo}</TextPressStart2P>
                <Text style={styles.descripcion}>{descripcion}</Text>
            </View>
            <View style={styles.playButtonContainer}>
                <TextPressStart2P style={styles.jugar}>Jugar</TextPressStart2P>
            </View>
        </TouchableOpacity>
    )
}

let tituloSize = 36;
if (Platform.OS === "ios") {
    tituloSize = 12
}
let descripcionSize = 20;
if (Platform.OS === "ios") {
    descripcionSize = 10
}

const styles = StyleSheet.create({
    button: {
        borderColor: "#4A3D70",
        backgroundColor: Colors.purpura,
        padding: 10,
        borderWidth: 4,
        flex: 1
    },
    title: {
        fontSize: tituloSize,
        color: "#fff",
        fontWeight: 'bold',
    },
    descripcion: {
        color: "#fff",
        fontSize: descripcionSize,
    },
    jugar: {
        fontSize: 12,
        color: "#fff",
        fontWeight: 'bold',
    },
    contenedorJugar: {
        width: "100%",
        alignItems: "flex-end",
    },
    contentContainer: {
        flex: 1,
        marginBottom: 10,
    },
    playButtonContainer: {
        alignItems: 'flex-end',
    },

});
