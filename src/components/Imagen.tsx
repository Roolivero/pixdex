import { StyleSheet } from "react-native";
import { Image } from "expo-image"
import { Colors } from "@/constants/Colors";


interface ImagenProps {
    url: string
    placeholder: string
}

export default function Imagen({ url, placeholder }: ImagenProps) {
    return (
        <Image
            style={styles.stylesImage}
            source={{ uri: url }}
            contentFit="cover"
            cachePolicy="disk"
            transition={300}
            placeholder={placeholder}
        />
    )
}


const styles = StyleSheet.create({
    stylesImage: {
        width: "100%",
        aspectRatio: 2 / 3,
        backgroundColor: Colors.grisOscuro,
    },
});