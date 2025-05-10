import { Colors } from "@/constants/Colors";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import DetailCard from "./components/DetailCard";
import DetailHeader from "./components/DetailHeader";


export interface DetailScreenProps {
    audioVisualId: string
}


export default function DetailScreen({ audioVisualId }: DetailScreenProps) {

    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorHeader}>
                <DetailHeader/>
            </View>
            {
                Platform.OS === "web" ? (
                    <View style={{ alignSelf: "center" }}>
                        <DetailCard audioVisualId={audioVisualId} />
                    </View>
                ) : (
                    <DetailCard audioVisualId={audioVisualId} />
                )
            }
        </ScrollView>
    )
}



// Styles
const styles = StyleSheet.create({

    contenedorPrincipal: {
        backgroundColor: Colors.fondo,
        flex: 1,
        borderWidth: 5,
        padding: 10,
    },
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    }
});
