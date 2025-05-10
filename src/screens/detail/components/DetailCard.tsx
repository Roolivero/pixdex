import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { DetailScreenProps } from "../DetailScreen";
import Etiqueta from "@/src/components/Etiqueta";
import ListaGeneros from "@/src/components/ListaGeneros";
import Imagen from "@/src/components/Imagen";



export default function DetailCard({ audioVisualId }: DetailScreenProps) {
    const tipoAudioVisualId: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (contenido) => contenido.id === Number(audioVisualId)
    );

    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tID) => tID.id === (tipoAudioVisualId ? tipoAudioVisualId.tipoId : undefined)
    );

    const dato: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (datoID) => datoID.id === Number(audioVisualId)
    );

    const generos = dato?.generos.map((id) =>
        generosContenidoAudiovisual.find((g) => g.id === id)
    );

    return (
        <View style={styles.contenedor}>
            {dato && <Imagen url={dato.imageUrl}/>}
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
            <ListaGeneros generos={generos?.filter((g): g is IGeneroContenidoAudiovisual => g !== undefined) || []}/>
        </View>
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
    contenedor: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        flex: 1,
        padding: 20
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
