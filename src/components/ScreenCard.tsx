import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

interface ScreenCardProps {
    children: ReactNode;
    padding?: number;
}

export function ScreenCard({ children, padding = 20 }: ScreenCardProps) {
    return (
        <View style={[styles.container, { padding }]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        flex: 1,
    },
}); 