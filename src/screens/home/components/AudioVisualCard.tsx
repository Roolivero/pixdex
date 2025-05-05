import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import {
  ContenidoAudiovisual,
} from "@/src/data/contenidosAudiovisuales";
import React from "react";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigate/routes"

interface AudioVisualCardProps {
  itemCard: ContenidoAudiovisual;
}

function mayusculas(texto: string): string {
  return texto.length === 0
    ? ""
    : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export function AudioVisualCard({ itemCard }: AudioVisualCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`${ROUTES.DETAIL}${itemCard.id}`)
  }

  const generos = itemCard.generos.map((id) =>
    generosContenidoAudiovisual.find((g) => g.id === id)
  );
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View style={styles.contenedor}>
        <Image
          style={styles.stylesImage}
          source={{ uri: itemCard.imageUrl }}
          resizeMode="cover"
        />
        <View>
          <TextPressStart2P style={styles.tituloCard}>
            {itemCard.nombre}
          </TextPressStart2P>
        </View>
        {generos.length > 0 && (
          <View style={styles.generosContenrdor}>
            {generos.map((g, i) => (
              <View key={1} style={styles.genero}>
                <Text key={i} style={styles.generoText}>
                  {mayusculas(g?.nombre ?? "—")}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      </TouchableOpacity>
  );
}

const WIDTH = Dimensions.get("window").width * 0.2;
const HEIGTH = WIDTH * 1.5;

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
  stylesImage: {
    width: "100%",
    height: HEIGTH,
    backgroundColor: Colors.grisOscuro,
  },
  tituloCard: {
    padding: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  generosContenrdor: {
    flexDirection: "row",
    paddingHorizontal:10,
    paddingBottom:8,
    justifyContent:"flex-start",
    alignItems: "flex-start",
    gap:10
  },
  genero: {
    backgroundColor: Colors.grisOscuro,
    padding: 4
  },
  generoText: {
    color: "#fff"
  },
});
