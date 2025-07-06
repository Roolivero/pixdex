import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

interface ScreenContainerProps {
    children: ReactNode;
    scrollable?: boolean;
    padding?: number;
}

export function ScreenContainer({ 
    children, 
    scrollable = true, 
    padding = 20 
}: ScreenContainerProps) {
    const containerStyle = [
        styles.container,
        { padding }
    ];

    if (scrollable) {
        return (
            <ScrollView style={containerStyle}>
                {children}
            </ScrollView>
        );
    }

    return (
        <View style={containerStyle}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
    },
}); 