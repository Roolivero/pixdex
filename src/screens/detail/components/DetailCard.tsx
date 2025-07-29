import { Colors } from "@/constants/Colors";
import Etiqueta from "@/src/components/Etiqueta";
import Imagen from "@/src/components/Imagen";
import ListaGeneros from "@/src/components/ListaGeneros";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { DetailScreenProps } from "../DetailScreen";
import { useAudiovisual } from "@/src/context/AudiovisualContext";
import { ScreenCard } from "@/src/components/ScreenCard";

export default function DetailCard({ audioVisualId }: DetailScreenProps) {
    const { getContenidoById, getTipoById, getGenerosByIds } = useAudiovisual();
    
    const dato = getContenidoById(Number(audioVisualId));
    const tipo = dato ? getTipoById(dato.tipoId) : undefined;
    const generos = dato ? getGenerosByIds(dato.generos) : [];

    const { width: screenWidth } = useWindowDimensions();
    const widthFactor = Platform.OS === 'web' ? 0.4 : 0.9;
    const CARD_WIDTH = screenWidth * widthFactor;

    return (
        <View style={{ width: CARD_WIDTH }}>
            <ScreenCard>
                {dato && <Imagen url={dato.imageUrl} placeholder={dato.nombre} />}
                <TextPressStart2P style={styles.tituloCard}>
                    {dato?.nombre}
                </TextPressStart2P>
                <View style={styles.generosContenedor}>
                    {tipo && <Etiqueta texto={tipo.singular} />}
                </View>
                <View style={styles.contenedorDescripcion} >
                    <Text style={styles.generoText} numberOfLines={4}>{dato?.descripcion}</Text>
                </View>
                <View style={styles.contenedorGeneroEtiqueta}>
                    <TextPressStart2P style={styles.etiquetaGenero}>
                        Generos
                    </TextPressStart2P>
                </View>
                <ListaGeneros generos={generos} />
            </ScreenCard>
        </View>
    )
}


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
    },
    nombreBoton: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold"
    },
    boton: {
        backgroundColor: Colors.purpura,
        padding: 15,
        borderWidth: 1,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
    },

    tituloCard: {
        padding: 10,
        color: Colors.purpura,
        fontSize: 20
    },
    contenedorDescripcion: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 15
    },
    generosContenedor: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingBottom: 8,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10
    },
    genero: {
        backgroundColor: Colors.grisOscuro,
        padding: 4
    },
    generoText: {
        color: "#fff"
    },
    etiquetaGenero: {
        fontSize: 14,
        color: Colors.verde,
        padding: 10,
    },
    contenedorGeneroEtiqueta: {
        paddingBottom: 10
    }
});
