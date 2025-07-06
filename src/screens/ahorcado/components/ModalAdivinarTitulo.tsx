import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import Boton from '@/src/components/Boton';

interface ModalAdivinarTituloProps {
    visible: boolean;
    onClose: () => void;
    onGuess: (titulo: string) => void;
}

export default function ModalAdivinarTitulo({ visible, onClose, onGuess }: ModalAdivinarTituloProps) {
    const [tituloAdivinado, setTituloAdivinado] = useState('');

    const handleSubmit = () => {
        if (tituloAdivinado.trim()) {
            onGuess(tituloAdivinado.trim());
            setTituloAdivinado('');
        }
    };

    const handleClose = () => {
        setTituloAdivinado('');
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
                        <TextInput
                            style={styles.input}
                            value={tituloAdivinado}
                            onChangeText={setTituloAdivinado}
                            placeholder="Escribe el título"
                            placeholderTextColor="rgba(155, 135, 245, 0.5)"
                            autoCapitalize="words"
                            autoCorrect={false}
                            onSubmitEditing={handleSubmit}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Boton 
                            onPress={handleSubmit} 
                            icon="check"
                            texto="ADIVINAR" 
                        />
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
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        backgroundColor: Colors.fondo,
        color: '#fff',
        padding: 15,
        fontSize: 16,
        borderRadius: 4,
        textAlign: 'center',
    },
    buttons: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
});
