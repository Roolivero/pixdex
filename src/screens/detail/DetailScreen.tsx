import { Colors } from "@/constants/Colors";
import { ScrollView, StyleSheet, View } from "react-native";
import DetailHeader from "./components/DetailHeader";
import DetailCard from "./components/DetailCard";


export interface DetailScreenProps {
    audioVisualId: string
}


export default function DetailScreen({ audioVisualId }: DetailScreenProps) {

    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorHeader}>
                <DetailHeader/>
            </View>
            <DetailCard audioVisualId={audioVisualId}/>
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
        //alignItems: "center"
    },
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    }
});
