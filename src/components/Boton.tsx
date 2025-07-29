import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface BotonProps {
    onPress: () => void
    icon?: keyof typeof MaterialIcons.glyphMap
    texto: string
    fontSize?: number
    showIcon?: boolean
    disabled?: boolean
}

export default function Boton({ 
    onPress, 
    icon, 
    texto, 
    fontSize = 12,
    showIcon = true,
    disabled = false
}: BotonProps) {
    const shouldShowIcon = showIcon && icon;
    
    return (
        <TouchableOpacity 
            style={[
                styles.button,
                disabled && styles.buttonDisabled
            ]} 
            activeOpacity={0.5}
            onPress={onPress}
            disabled={disabled}
        >
            <TextPressStart2P style={[
                styles.textButton,
                { fontSize },
                disabled && styles.textDisabled
            ]}>
                {shouldShowIcon && <MaterialIcons name={icon!} />}
                {shouldShowIcon && <Text> </Text>}
                {texto}
            </TextPressStart2P>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.purpura,
        padding: 5,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },
    buttonDisabled: {
        backgroundColor: Colors.grisOscuro,
        borderColor: Colors.grisOscuro,
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold"
    },
    textDisabled: {
        color: Colors.purpuraClaro,
    }
}); 