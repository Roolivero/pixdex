import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";


interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View>
                <TouchableOpacity activeOpacity={0.5} style={styles.boton}>
                    <TextPressStart2P style={styles.nombreBoton}> Back</TextPressStart2P>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor}>
                
            </View>
        </ScrollView>
    )
}


// Styles
const styles = StyleSheet.create({
    contenedorPrincipal: {
        backgroundColor: Colors.fondo,
        flex: 1,
        borderWidth: 5,

    },
    nombreBoton: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold"
    },
    boton: {
        backgroundColor: Colors.purpura,
        padding: 5,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },
    contenedor: {
        borderWidth: 2,
        borderTopColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
        borderBottomColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
    }
});
