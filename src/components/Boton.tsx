import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

interface BotonProps {
    onPress: () => void
    icon: keyof typeof MaterialIcons.glyphMap
    texto: string
    variant?: "small" | "large"
}

export default function Boton({ onPress, icon, texto, variant = "large" }: BotonProps) {
    return (
        <TouchableOpacity 
            style={variant === "small" ? styles.buttonSmall : styles.buttonLarge} 
            activeOpacity={0.5}
            onPress={onPress}
        >
            <TextPressStart2P style={variant === "small" ? styles.textButtonSmall : styles.textButtonLarge}>
                <MaterialIcons name={icon} /> {texto}
            </TextPressStart2P>
        </TouchableOpacity>
    )
}

// Styles
const styles = StyleSheet.create({
    buttonSmall: {
        backgroundColor: Colors.purpura,
        padding: 5,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },
    buttonLarge: {
        backgroundColor: Colors.purpura,
        padding: 15,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },
    textButtonSmall: {
        fontSize: 9,
        color: "#fff",
        padding: 5,
    },
    textButtonLarge: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold"
    }
}); 