import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";
import { AudioVisualScroll } from "./components/AudioVisualScroll";
import { ROUTES } from "@/src/navigate/routes";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { useState, useEffect } from "react";
import { ModalFiltros } from "@/src/components/ModalFiltros";
import { getContenidosConDemora, getTiposConDemora, getGenerosConDemora } from "@/src/services/servicios-demora";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { filtrarContenidos } from "@/src/tools/filtros";
import { API_URL } from "@/constants/Config";

export function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
    const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
    const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
    const [contenidosFiltrados, setContenidosFiltrados] = useState<IContenidoAudiovisual[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tiposSeleccionados, setTiposSeleccionados] = useState<number[]>([]);
    const [generosSeleccionados, setGenerosSeleccionados] = useState<number[]>([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setIsLoading(true);
        try {
            console.log("Iniciando carga de datos desde:", API_URL);
            const [contenidosData, tiposData, generosData] = await Promise.all([
                getContenidosConDemora(),
                getTiposConDemora(),
                getGenerosConDemora()
            ]);
            
            console.log("Datos cargados exitosamente:", {
                contenidos: contenidosData.length,
                tipos: tiposData.length,
                generos: generosData.length
            });
            
            setContenidos(contenidosData);
            setTipos(tiposData);
            setGeneros(generosData);
            setContenidosFiltrados(contenidosData);
        } catch (error) {
            console.error("Error cargando datos:", error);
            // Fallback a datos locales si la API falla
            const { contenidosAudiovisuales } = await import('@/src/data/contenidosAudiovisuales');
            const { tiposContenidoAudiovisual } = await import('@/src/data/tiposContenidoAudiovisual');
            const { generosContenidoAudiovisual } = await import('@/src/data/generosContenidoAudiovisual');
            
            setContenidos(contenidosAudiovisuales);
            setTipos(tiposContenidoAudiovisual);
            setGeneros(generosContenidoAudiovisual);
            setContenidosFiltrados(contenidosAudiovisuales);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = (tipos: number[], generos: number[]) => {
        setTiposSeleccionados(tipos);
        setGenerosSeleccionados(generos);
        
        const filtrados = filtrarContenidos(contenidos, tipos, generos);
        setContenidosFiltrados(filtrados);
    };

    const handleOpenFilters = () => {
        console.log("Abriendo modal con datos:", {
            tipos: tipos.length,
            generos: generos.length,
            contenidos: contenidos.length
        });
        setModalVisible(true);
    };

    const tiposParaMostrar = tiposSeleccionados.length > 0
        ? tipos.filter(t => tiposSeleccionados.includes(t.id))
        : tipos;

    if (isLoading) {
        return (
            <View style={[styles.screenContainer, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.purpura} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <HomeHeader onOpenFilters={handleOpenFilters} />
            <View style={styles.buttonContainer}>
                <GameButton titulo="Desafío del Ahorcado" descripcion="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?" fondo={Colors.purpura} url={ROUTES.AHORCADO}/>
                <GameButton titulo="Pixel Reveal" descripcion="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!" fondo={Colors.verde} url={ROUTES.PIXEL_REVEAL}/>
            </View>
            <View style={styles.contenedorScroll}>
                {tiposParaMostrar.map(tipo => (
                    <AudioVisualScroll 
                        key={tipo.id} 
                        tipoId={tipo.id} 
                        contenidosFiltrados={contenidosFiltrados}
                    />
                ))}
            </View>

            <ModalFiltros
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onApplyFilters={handleApplyFilters}
                tipos={tipos}
                generos={generos}
            />
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    screenContainer: { 
        flex: 1,
        backgroundColor: Colors.fondo 
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        gap: 20
    },
    contenedorScroll: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        gap: 20
    }
});
