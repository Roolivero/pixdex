import { Colors } from "@/constants/Colors";
import Imagen from "@/src/components/Imagen";
import ListaGeneros from "@/src/components/ListaGeneros";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import {
  ContenidoAudiovisual,
} from "@/src/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { Mayuscula } from "@/src/tools/mayuscula";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions,  StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioVisualCardProps {
  itemCard: ContenidoAudiovisual;
}

export function AudioVisualCard({ itemCard }: AudioVisualCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/detail/[audioVisualId]",
      params: { audioVisualId: itemCard.id.toString() }
    });
  }

  const generos = itemCard.generos.map((id) =>
    generosContenidoAudiovisual.find((g) => g.id === id)
  );
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View style={styles.contenedor}>
        {itemCard && <Imagen url={itemCard.imageUrl}/>}
        <View>
          <TextPressStart2P style={styles.tituloCard}>
            {itemCard.nombre}
          </TextPressStart2P>
        </View>
        <ListaGeneros generos={generos?.filter((g): g is IGeneroContenidoAudiovisual => g !== undefined) || []}/>
      </View>
      </TouchableOpacity>
  );
}

const WIDTH = Dimensions.get("window").width * 0.2;

// Styles
const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 2,
    borderTopColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    width: WIDTH,
  },
  tituloCard: {
    padding: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  }
});
