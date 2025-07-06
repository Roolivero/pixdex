import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "./TextPressStart2P";
import { Boton } from "./Boton";

interface ErrorContainerProps {
    message: string;
    onRetry?: () => void;
    showRetryButton?: boolean;
}

export function ErrorContainer({ 
    message, 
    onRetry, 
    showRetryButton = true 
}: ErrorContainerProps) {
    return (
        <View style={styles.container}>
            <TextPressStart2P style={styles.errorText}>
                {message}
            </TextPressStart2P>
            {showRetryButton && onRetry && (
                <Boton 
                    onPress={onRetry}
                    texto="REINTENTAR"
                    icon="refresh"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorText: {
        color: Colors.purpura,
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        marginBottom: 20
    }
}); 