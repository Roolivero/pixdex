import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { HomeHeader } from "./components/HomeHeader";

export function HomeScreen() {
    return (
        <View style={styles.screenContainer}>
            <HomeHeader />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: Colors.fondo }
});
