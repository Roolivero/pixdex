import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";



interface DetailScreenProps {
    audioVisualId: string
}

function mayusculas(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tID) => tID.id === Number(audioVisualId)
    );

    const dato: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (datoID) => datoID.id === Number(audioVisualId)
    );
    const generos = dato?.generos.map((id) =>
        generosContenidoAudiovisual.find((g) => g.id === id)
    );

    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorHeader}>
                <TouchableOpacity activeOpacity={0.5} style={styles.boton}>
                    <TextPressStart2P style={styles.nombreBoton}> Back</TextPressStart2P>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedor}>
                <Image
                    style={styles.stylesImage}
                    source={{ uri: dato?.imageUrl }}
                    resizeMode="cover"
                />
                <View>
                    <TextPressStart2P style={styles.tituloCard}>
                        {dato?.nombre}
                    </TextPressStart2P>
                </View>
                <View style={styles.generosContenedor}>
                    <View style={styles.genero}> 
                        <Text style={styles.generoText} >{mayusculas(tipo?.singular ?? "")}</Text>
                    </View>
                </View>
                <View style={styles.contenedorDescripcion} >
                    <Text style={styles.generoText} numberOfLines={4}>{dato?.descripcion}</Text>
                </View>
                <View style={styles.contenedorGeneroEtiqueta}>
                    <TextPressStart2P style={styles.etiquetaGenero}>
                        Generos
                    </TextPressStart2P>
                </View>
                {(generos ?? []).length > 0 && (
                    <View style={styles.generosContenedor}>
                        {generos?.map((g, i) => (
                            <View key={i} style={styles.genero}>
                                <Text key={i} style={styles.generoText}>
                                    {mayusculas(g?.nombre ?? "—")}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const WIDTH = Dimensions.get("window").width * 0.2;
const HEIGTH = WIDTH * 1.5;


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
    stylesImage: {
        width: "100%",
        height: HEIGTH,
        backgroundColor: Colors.grisOscuro,
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
    },
    contenedorGeneroEtiqueta: {
        paddingBottom: 10
    }
});
