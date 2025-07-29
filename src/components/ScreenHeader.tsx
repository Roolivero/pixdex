import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { StyleSheet, Platform, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenHeaderProps {
    onBack: () => void;
    title?: string;
}

export function ScreenHeader({ onBack, title }: ScreenHeaderProps) {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 5 : 2;

    return (
        <View style={[styles.container, { paddingTop }]}>
            <Boton onPress={onBack} icon="arrow-back" texto="BACK" />
            {title && (
                <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 16,
        color: Colors.purpura,
        fontWeight: "bold",
        marginTop: 10,
    },
}); 