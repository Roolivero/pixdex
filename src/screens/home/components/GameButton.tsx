import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

interface GameButtonProps{
    titulo: string,
    descripcion: string,
    fondo: string,
    url: Href
}

export function GameButton({titulo, descripcion, fondo, url}: GameButtonProps){
    const router = useRouter();
    const handlePress = () => {
        router.push(url)
    }
    
    return (
        <TouchableOpacity style={[styles.button,{backgroundColor:fondo}]} onPress={handlePress} >
            <TextPressStart2P style={styles.title}>{titulo}</TextPressStart2P>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <View style={styles.contenedorJugar}>
                <TextPressStart2P style={styles.jugar}>Jugar</TextPressStart2P>
            </View>
        </TouchableOpacity>
    )
}


// Styles
const styles = StyleSheet.create({
    button: {
        borderColor: "#4A3D70",
        backgroundColor: Colors.purpura,
        padding: 20,
        borderWidth: 4,
        flex: 1
    },
    title: {
        fontSize: 36,
        color: "#fff", 
        fontWeight: 'bold',
    },
    descripcion: {
        color: "#fff",
        fontSize: 20,
    },
    jugar: {
        fontSize: 12,
        color: "#fff", 
        fontWeight: 'bold',
    },
    contenedorJugar: {
        width: "100%",
        alignItems: "flex-end",
    }
    
});
