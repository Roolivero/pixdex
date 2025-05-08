import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function DetailHeader(){
    const router = useRouter();
        const handlePress = () => {
            router.push({
                pathname: "/",
            });
        }
    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.boton} onPress={handlePress}>
            <TextPressStart2P style={styles.nombreBoton}> Back</TextPressStart2P>
        </TouchableOpacity>
        )        
}

// Styles
const styles = StyleSheet.create({
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    },
    nombreBoton: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold"
    },
    boton: {
        backgroundColor: Colors.purpura,
        padding: 15,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    }
});
