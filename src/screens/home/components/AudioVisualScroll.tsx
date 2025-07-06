import { FlatList, StyleSheet, View, Text} from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import React, { useState, useCallback } from "react";
import { AudioVisualCard } from "./AudioVisualCard";
import { useAudiovisual } from "@/src/context/AudiovisualContext";

interface AudioVisualScrollProps{
    tipoId: number,
    contenidosFiltrados: IContenidoAudiovisual[];
}

export function AudioVisualScroll({tipoId, contenidosFiltrados}: AudioVisualScrollProps){
    const { getTipoById } = useAudiovisual();
    const tipo = getTipoById(tipoId);
    
    const datos: IContenidoAudiovisual[] = contenidosFiltrados.filter(
        (datoID) => datoID.tipoId === tipoId
    );

    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const handleMeasure = useCallback((height: number) => {
        setMaxCardHeight(prev => Math.max(prev, height));
    }, []);

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
                    key={`flatlist-height-${maxCardHeight}`}
                    data={datos}
                    horizontal
                    keyExtractor={(item) => `${item.id}-height-${maxCardHeight}`}
                    renderItem={({item}) => (
                        <AudioVisualCard 
                            itemCard={item} 
                            onMeasure={handleMeasure}
                            fixedHeight={maxCardHeight > 0 ? maxCardHeight : undefined}
                        />
                    )} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listaStyle}
                />
            )}
        </View>
    )
}


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
