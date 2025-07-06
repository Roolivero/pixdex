import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from './TextPressStart2P';
import { ITipoContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { IGeneroContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import Boton from './Boton';
import { Mayuscula } from '@/src/tools/mayuscula';
import { FilterSection } from './filters/FilterSection';

interface ModalFiltrosProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (tiposSeleccionados: number[], generosSeleccionados: number[]) => void;
    tipos: ITipoContenidoAudiovisual[];
    generos: IGeneroContenidoAudiovisual[];
}

export function ModalFiltros({ visible, onClose, onApplyFilters, tipos, generos }: ModalFiltrosProps) {
    const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([]);
    const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);

    const toggleTipo = (tipoId: number) => {
        setTiposSeleccionados(prev => 
            prev.includes(tipoId) 
                ? prev.filter(id => id !== tipoId)
                : [...prev, tipoId]
        );
    };

    const toggleGenero = (generoId: number) => {
        setGenerosSeleccionados(prev => 
            prev.includes(generoId) 
                ? prev.filter(id => id !== generoId)
                : [...prev, generoId]
        );
    };

    const handleApplyFilters = () => {
        onApplyFilters(tiposSeleccionados, generosSeleccionados);
        onClose();
    };

    const resetFilters = () => {
        setTiposSeleccionados([]);
        setGenerosSeleccionados([]);
    };



    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <TextPressStart2P style={styles.title}>FILTRAR</TextPressStart2P>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <TextPressStart2P style={styles.closeText}>X</TextPressStart2P>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
                        <FilterSection
                            title="Tipos"
                            items={tipos.map(tipo => ({ id: tipo.id, label: Mayuscula(tipo.plural) }))}
                            selectedItems={tiposSeleccionados}
                            onToggleItem={toggleTipo}
                            isLoading={tipos.length === 0}
                        />
                        
                        <FilterSection
                            title="Géneros"
                            items={generos.map(genero => ({ id: genero.id, label: Mayuscula(genero.nombre) }))}
                            selectedItems={generosSeleccionados}
                            onToggleItem={toggleGenero}
                            isLoading={generos.length === 0}
                            useGrid={true}
                        />
                    </ScrollView>

                    <View style={styles.buttons}>
                        <Boton 
                            onPress={resetFilters} 
                            icon="refresh"
                            texto="RESET" 
                        />
                        <Boton 
                            onPress={handleApplyFilters} 
                            icon="check"
                            texto="APLICAR" 
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
        width: '90%',
        height: '80%',
        backgroundColor: Colors.fondo,
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
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
        backgroundColor: Colors.fondo,
        padding: 0,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
}); 