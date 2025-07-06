import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import Boton from '@/src/components/Boton';

interface ModalAdivinarLetraProps {
    visible: boolean;
    onClose: () => void;
    onGuess: (letra: string) => void;
}

export default function ModalAdivinarLetra({ visible, onClose, onGuess }: ModalAdivinarLetraProps) {
    const [letrasUsadas, setLetrasUsadas] = useState<string[]>([]);
    
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleLetraPress = (letra: string) => {
        if (!letrasUsadas.includes(letra)) {
            setLetrasUsadas(prev => [...prev, letra]);
            onGuess(letra);
        }
    };

    const handleClose = () => {
        setLetrasUsadas([]);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <TextPressStart2P style={styles.title}>ADIVINAR</TextPressStart2P>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <TextPressStart2P style={styles.closeText}>X</TextPressStart2P>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <ScrollView style={styles.letrasContainer} showsVerticalScrollIndicator={false}>
                            <View style={styles.letrasGrid}>
                                {abecedario.map((letra) => {
                                    const isUsed = letrasUsadas.includes(letra);
                                    return (
                                        <Boton
                                            key={letra}
                                            onPress={() => handleLetraPress(letra)}
                                            texto={letra}
                                            fontSize={19}
                                            disabled={isUsed}
                                        />
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        height: '60%',
        backgroundColor: Colors.fondo,
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
        borderRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.purpura,
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        color: Colors.purpura,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 16,
        color: Colors.purpura,
    },
    content: {
        flex: 1,
    },
    letrasContainer: {
        flex: 1,
    },
    letrasGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 15,
    },
}); 