import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import { Mayuscula } from "../tools/mayuscula";
import { ITipoContenidoAudiovisual } from "../data/tiposContenidoAudiovisual";

interface EtiquetaProps{
    texto: string
}

export default function Etiqueta({texto}: EtiquetaProps) {
    return (
        <View style={styles.genero}>
            <Text style={styles.generoText}>{Mayuscula(texto)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    genero: {
        backgroundColor: Colors.grisOscuro,
        padding: 4
    },
    generoText: {
        color: "#fff"
    }
});
