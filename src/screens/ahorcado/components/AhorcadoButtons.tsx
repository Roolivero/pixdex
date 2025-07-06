import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Boton from "@/src/components/Boton";
import { useState } from "react";
import ModalAdivinarTitulo from "./ModalAdivinarTitulo";
import ModalAdivinarLetra from "./ModalAdivinarLetra";

interface AhorcadoButtonsProps {
    onAdivinarTitulo: (titulo: string) => void;
    onAdivinarLetra: (letra: string) => void;
}

export default function AhorcadoButtons({ onAdivinarTitulo, onAdivinarLetra }: AhorcadoButtonsProps) {
    const [showModalTitulo, setShowModalTitulo] = useState(false);
    const [showModalLetra, setShowModalLetra] = useState(false);

    const handleAdivinarTitulo = (titulo: string) => {
        onAdivinarTitulo(titulo);
        setShowModalTitulo(false);
    };

    const handleAdivinarLetra = (letra: string) => {
        onAdivinarLetra(letra);
        setShowModalLetra(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Boton
                    onPress={() => setShowModalTitulo(true)}
                    texto="GUESS TITLE"
                    fontSize={8}
                />
                <Boton
                    onPress={() => setShowModalLetra(true)}
                    texto="GUESS LETTER"
                    fontSize={8}
                />
            </View>

            <ModalAdivinarTitulo
                visible={showModalTitulo}
                onClose={() => setShowModalTitulo(false)}
                onGuess={handleAdivinarTitulo}
            />
            <ModalAdivinarLetra
                visible={showModalLetra}
                onClose={() => setShowModalLetra(false)}
                onGuess={handleAdivinarLetra}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
}); 