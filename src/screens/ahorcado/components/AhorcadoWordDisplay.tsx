import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface AhorcadoWordDisplayProps {
    titulo: string;
    letrasAdivinadas: string[];
}

export default function AhorcadoWordDisplay({ titulo, letrasAdivinadas }: AhorcadoWordDisplayProps) {
    const renderLetras = () => {
        return titulo.split('').map((letra, index) => {
            const esLetra = /[A-Za-z]/.test(letra);
            const esAdivinada = letrasAdivinadas.some(l => l.toLowerCase() === letra.toLowerCase());
            
            if (!esLetra) {
                return (
                    <Text key={index} style={styles.espacio}>
                        {letra}
                    </Text>
                );
            }

            return (
                <View key={index} style={styles.letraContainer}>
                    <Text style={styles.letra}>
                        {esAdivinada ? letra.toUpperCase() : '_'}
                    </Text>
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.palabraContainer}>
                {renderLetras()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    palabraContainer: {
        backgroundColor: Colors.grisOscuro,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        minHeight: 60,
    },
    letraContainer: {
        minWidth: 16,
        alignItems: 'center',
    },
    letra: {
        fontSize: 22,
        color: '#fff',
        letterSpacing: 1,
    },
    espacio: {
        fontSize: 22,
        color: '#fff',
        marginHorizontal: 2,
    },
}); 