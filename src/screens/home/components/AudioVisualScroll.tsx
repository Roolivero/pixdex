import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import React, { useState } from "react";
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualScrollProps{
    tipoId: number,
    // url: Href
}

export function AudioVisualScroll({tipoId}: AudioVisualScrollProps){
    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tID) => tID.id === tipoId
    );
    
    const datos: ContenidoAudiovisual[] = contenidosAudiovisuales.filter(
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
            <FlatList 
                data={datos}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <AudioVisualCard itemCard={item} onMeasure={handleMeasure}
                        fixedHeight={maxCardHeight || undefined}/>}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listaStyle}
            />
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
    }
});
