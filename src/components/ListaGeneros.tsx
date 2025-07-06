import { View, Text, StyleSheet } from "react-native"
import { IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";
import Etiqueta from "./Etiqueta";

interface ListaGenerosProps {
    generos: IGeneroContenidoAudiovisual[]
}


export default function ListaGeneros({ generos }: ListaGenerosProps) {
    return (
        generos.length > 0 && (
            <View style={styles.generosContenedor}>
                {generos.map((g, i) => (
                    <Etiqueta key={i} texto={g.nombre} />
                ))}
            </View>
        )
    );
}



const styles = StyleSheet.create({
    generosContenedor: {
        alignSelf: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingBottom: 8,
        gap: 10
    },
});