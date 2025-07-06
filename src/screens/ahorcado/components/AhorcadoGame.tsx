import { Colors } from "@/constants/Colors";
import { StyleSheet, View, Platform, Text } from "react-native";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import Imagen from "@/src/components/Imagen";
import AhorcadoButtons from "./AhorcadoButtons";
import AhorcadoWordDisplay from "./AhorcadoWordDisplay";
import { useState, useEffect } from "react";

interface AhorcadoGameProps {
    contenido: IContenidoAudiovisual;
    onAdivinarTitulo: (titulo: string) => void;
    onAdivinarLetra: (letra: string) => void;
}

export default function AhorcadoGame({ contenido, onAdivinarTitulo, onAdivinarLetra }: AhorcadoGameProps) {
    const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);

    // Función para verificar si el título está completamente adivinado
    const verificarTituloCompleto = () => {
        const letrasTitulo = contenido.nombre.split('').filter(letra => /[A-Za-z]/.test(letra));
        const todasAdivinadas = letrasTitulo.every(letra => 
            letrasAdivinadas.some(letraAdivinada => 
                letraAdivinada.toLowerCase() === letra.toLowerCase()
            )
        );
        return todasAdivinadas;
    };

    // Efecto para verificar si el título está completo después de cada letra adivinada
    useEffect(() => {
        if (letrasAdivinadas.length > 0 && verificarTituloCompleto()) {
            // Si todas las letras han sido adivinadas, simular que se adivinó el título completo
            onAdivinarTitulo(contenido.nombre);
            // Resetear las letras adivinadas para el siguiente contenido
            setLetrasAdivinadas([]);
        }
    }, [letrasAdivinadas, contenido.nombre, onAdivinarTitulo]);

    // Efecto para resetear las letras adivinadas cuando cambia el contenido
    useEffect(() => {
        setLetrasAdivinadas([]);
    }, [contenido.id]);

    const handleAdivinarLetra = (letra: string) => {
        setLetrasAdivinadas(prev => [...prev, letra]);
        onAdivinarLetra(letra);
    };

    const { width: screenWidth } = Platform.OS === 'web' ? { width: 800 } : { width: 400 };
    const CARD_WIDTH = screenWidth * 0.9;

    return (
        <View style={[styles.contenedor, { width: CARD_WIDTH }]}>
            {/* Botones de adivinación */}
            <AhorcadoButtons
                onAdivinarTitulo={onAdivinarTitulo}
                onAdivinarLetra={handleAdivinarLetra}
            />

            {/* Imagen del contenido */}
            <View style={styles.imagenContainer}>
                <Imagen url={contenido.imageUrl} placeholder={contenido.nombre} />
            </View>

            {/* Texto de debug */}
            <Text style={styles.debugText}>
                {contenido.nombre}
            </Text>

            {/* Área de letras */}
            <AhorcadoWordDisplay
                titulo={contenido.nombre}
                letrasAdivinadas={letrasAdivinadas}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
        alignSelf: 'center',
    },
    imagenContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    debugText: {
        color: Colors.grisOscuro,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
        fontStyle: 'italic',
    },
});
