import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "./TextPressStart2P";

interface LoadingContainerProps {
    message?: string;
    size?: "small" | "large";
}

export function LoadingContainer({ 
    message, 
    size = "large" 
}: LoadingContainerProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={Colors.purpura} />
            {message && (
                <TextPressStart2P style={styles.message}>
                    {message}
                </TextPressStart2P>
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
    message: {
        color: Colors.purpura,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    }
}); 