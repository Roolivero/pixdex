import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeHeader() {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 20 : 20;

    return (
        <View style={[styles.container, { paddingTop }]}>
            <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                <TextPressStart2P style={styles.textButton}><MaterialIcons name="settings" /> FILTRAR</TextPressStart2P>
            </TouchableOpacity>
        </View>
    );
}

let espacioHeader = 90
if (Platform.OS === "ios") {
    espacioHeader = 130
}

// Styles
const styles = StyleSheet.create({
    container: {
        height: espacioHeader,
        backgroundColor: Colors.fondo,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    title: {
        fontSize: 24,
        color: Colors.purpura, 
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.purpura,
        padding: 5,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },
    textButton: {
        fontSize: 9,
        color: "#fff",
        padding: 5,
    }
});
