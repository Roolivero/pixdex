import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { TouchableOpacity, StyleSheet, Platform, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailHeader(){
    const router = useRouter();
        const handlePress = () => {
            router.back();
        };
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 5 : 2;
    
    return(
        <View style={{ paddingTop }}>
            <TouchableOpacity activeOpacity={0.5} style={styles.boton} onPress={handlePress}>
                <TextPressStart2P style={styles.nombreBoton}> Back</TextPressStart2P>
            </TouchableOpacity>
        </View>
        )        
}


// Styles
const styles = StyleSheet.create({
    contenedorHeader: {
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
