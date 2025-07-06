import { Colors } from "@/constants/Colors";
import Imagen from "@/src/components/Imagen";
import ListaGeneros from "@/src/components/ListaGeneros";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import {
  IContenidoAudiovisual,
} from "@/src/data/contenidosAudiovisuales";
import { useRouter } from "expo-router";
import React from "react";
import {Platform, StyleSheet, TouchableOpacity, useWindowDimensions, View, LayoutChangeEvent } from "react-native";
import { useAudiovisual } from "@/src/context/AudiovisualContext";

interface AudioVisualCardProps {
  itemCard: IContenidoAudiovisual;
  fixedHeight?:number;
  onMeasure?:(height:number)=>void;
}

export function AudioVisualCard({ itemCard, fixedHeight, onMeasure }: AudioVisualCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const widthFactor = Platform.OS === 'web' ? 0.2 : 0.5;
  const CARD_WIDTH = screenWidth * widthFactor;

  const router = useRouter();
  const { getGenerosByIds } = useAudiovisual();
  
  const handlePress = () => {
    router.push({
      pathname: "/detail/[audioVisualId]",
      params: { audioVisualId: itemCard.id.toString() }
    });
  }

  const generos = getGenerosByIds(itemCard.generos);
  
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View 
        style={[
          styles.contenedor,
          { width: CARD_WIDTH }, 
          fixedHeight != null ? { height: fixedHeight } : undefined
        ]} 
        onLayout={(e: LayoutChangeEvent) => {
          const { height } = e.nativeEvent.layout;
          if (onMeasure && height > 0) {
            onMeasure(height);
          }
        }}
      >
        {itemCard && <Imagen url={itemCard.imageUrl} placeholder="https://place-hold.it/400x600" />}
        <View style={styles.contenidoContainer}>
          <View style={styles.tituloContainer}>
            <TextPressStart2P style={styles.tituloCard}>
              {itemCard.nombre}
            </TextPressStart2P>
          </View>
          <View style={styles.generosContainer}>
            <ListaGeneros generos={generos} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 2,
    borderTopColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    flexDirection: 'column',
  },
  contenidoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tituloContainer: {
    // El título se mantiene en la parte superior
  },
  generosContainer: {
    // Los géneros se posicionan al final
    marginTop: 'auto',
  },
  tituloCard: {
    padding: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  }
});
