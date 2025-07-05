import React, { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from './TextPressStart2P';
import { ITipoContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { IGeneroContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import Boton from './Boton';
import { Mayuscula } from '@/src/tools/mayuscula';

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

    // Para dividir los géneros en dos columnas
    const generosPorColumna = Math.ceil(generos.length / 2);
    const generosCol1 = generos.slice(0, generosPorColumna);
    const generosCol2 = generos.slice(generosPorColumna);

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
                        <View style={styles.section}>
                            <TextPressStart2P style={styles.sectionTitle}>Tipos</TextPressStart2P>
                            {tipos.length === 0 ? (
                                <TextPressStart2P style={styles.noDataText}>Cargando tipos...</TextPressStart2P>
                            ) : (
                                tipos.map(tipo => (
                                    <TouchableOpacity
                                        key={tipo.id}
                                        style={styles.checkboxRow}
                                        onPress={() => toggleTipo(tipo.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[styles.checkboxBox, tiposSeleccionados.includes(tipo.id) && styles.checkboxBoxSelected]}>
                                            {tiposSeleccionados.includes(tipo.id) && <Text style={styles.checkboxTick}>✓</Text>}
                                        </View>
                                        <Text style={styles.checkboxTextNormal}>{Mayuscula(tipo.plural)}</Text>
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>

                        <View style={styles.section}>
                            <TextPressStart2P style={styles.sectionTitle}>Géneros</TextPressStart2P>
                            {generos.length === 0 ? (
                                <TextPressStart2P style={styles.noDataText}>Cargando géneros...</TextPressStart2P>
                            ) : (
                                <View style={styles.generosGrid}>
                                    <View style={styles.generosCol}>
                                        {generosCol1.map(genero => (
                                            <TouchableOpacity
                                                key={genero.id}
                                                style={styles.checkboxRow}
                                                onPress={() => toggleGenero(genero.id)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={[styles.checkboxBox, generosSeleccionados.includes(genero.id) && styles.checkboxBoxSelected]}>
                                                    {generosSeleccionados.includes(genero.id) && <Text style={styles.checkboxTick}>✓</Text>}
                                                </View>
                                                <Text style={styles.checkboxTextNormal}>{Mayuscula(genero.nombre)}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={styles.generosCol}>
                                        {generosCol2.map(genero => (
                                            <TouchableOpacity
                                                key={genero.id}
                                                style={styles.checkboxRow}
                                                onPress={() => toggleGenero(genero.id)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={[styles.checkboxBox, generosSeleccionados.includes(genero.id) && styles.checkboxBoxSelected]}>
                                                    {generosSeleccionados.includes(genero.id) && <Text style={styles.checkboxTick}>✓</Text>}
                                                </View>
                                                <Text style={styles.checkboxTextNormal}>{Mayuscula(genero.nombre)}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    <View style={styles.buttons}>
                        <Boton 
                            onPress={resetFilters} 
                            icon="refresh"
                            texto="RESET" 
                            variant="small" 
                        />
                        <Boton 
                            onPress={handleApplyFilters} 
                            icon="check"
                            texto="APLICAR" 
                            variant="small" 
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
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        color: Colors.purpuraClaro,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxBox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        backgroundColor: Colors.fondo,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxBoxSelected: {
        borderColor: Colors.purpura,
        backgroundColor: Colors.purpura,
    },
    checkboxTick: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 18,
        includeFontPadding: false,
    },
    checkboxTextNormal: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    },
    generosGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    generosCol: {
        flex: 1,
    },
    noDataText: {
        fontSize: 12,
        color: Colors.purpuraClaro,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
}); 