import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { FlatList, StyleSheet, View, Text} from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import React, { useState } from "react";
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualScrollProps{
    tipoId: number,
    contenidosFiltrados: IContenidoAudiovisual[];
    // url: Href
}

export function AudioVisualScroll({tipoId, contenidosFiltrados}: AudioVisualScrollProps){
    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tID) => tID.id === tipoId
    );
    
    const datos: IContenidoAudiovisual[] = contenidosFiltrados.filter(
        (datoID) => datoID.tipoId === tipo?.id
    );

    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const handleMeasure = (height: number) => {
        if (height > maxCardHeight) setMaxCardHeight(height);
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorTitulo}>
                <TextPressStart2P style={styles.titulo}>{tipo?.plural.toUpperCase()}</TextPressStart2P>
            </View>
            {datos.length === 0 ? (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No hay resultados que coincidan con su búsqueda</Text>
                </View>
            ) : (
                <FlatList 
                    data={datos}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <AudioVisualCard itemCard={item} onMeasure={handleMeasure}
                            fixedHeight={maxCardHeight || undefined}/>} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listaStyle}
                />
            )}
        </View>
    )
}


// Styles
const styles = StyleSheet.create({
    contenedor: {
        borderWidth:4,
        borderColor: Colors.grisOscuro,
        flex: 1,
        padding: 20
    },
    titulo: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold"
    },
    contenedorTitulo: {
        borderWidth:2,
        borderColor: Colors.purpuraClaro,
        backgroundColor: Colors.purpura,
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: "absolute",
        zIndex: 1,
        top: -15,
        left: 15
    },
    listaStyle: {
        gap: 10
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.grisOscuro
    }
});
