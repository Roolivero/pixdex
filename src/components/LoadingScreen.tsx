import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from './TextPressStart2P';

interface LoadingScreenProps {
    message?: string;
    size?: 'small' | 'large';
}

export function LoadingScreen({ 
    message = "Cargando...", 
    size = 'large' 
}: LoadingScreenProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={Colors.purpura} />
            <TextPressStart2P style={styles.message}>{message}</TextPressStart2P>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        color: Colors.purpura,
        textAlign: 'center'
    }
}); 