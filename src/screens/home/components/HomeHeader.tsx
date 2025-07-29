import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import Boton from "@/src/components/Boton";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeHeaderProps {
    onOpenFilters: () => void;
    onToggleAuth: () => void;
    isLoggedIn: boolean;
}

export function HomeHeader({ onOpenFilters, onToggleAuth, isLoggedIn }: HomeHeaderProps) {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 20 : 20;

    return (
        <View style={[styles.container, { paddingTop }]}>
            <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
            <View style={styles.buttonsContainer}>
                <Boton onPress={onToggleAuth} icon={isLoggedIn ? "logout" : "login"} texto={isLoggedIn ? "CERRAR SESIÓN" : "INICIAR SESIÓN"} fontSize={10} />
                <Boton onPress={onOpenFilters} icon="settings" texto="FILTRAR" fontSize={10} />
            </View>
        </View>
    );
}

let espacioHeader = 90
if (Platform.OS === "ios") {
    espacioHeader = 130
}

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
        fontSize: 22,
        color: Colors.purpura, 
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: "column",
        gap: 5,
        alignItems: "flex-end"
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
