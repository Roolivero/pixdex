import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";

export function HomeHeader() {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 20 : 20;

    return (
        <View style={[styles.container, { paddingTop: paddingTop }]}>
            <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
            <TouchableOpacity style={styles.button}>
                <TextPressStart2P>Filtrar</TextPressStart2P>

            </TouchableOpacity>
        </View>
        
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: Colors.fondo,
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        color: Colors.purpura, 
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.purpura,
        padding: 10,
    }
});
