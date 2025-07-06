import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from './TextPressStart2P';
import { MaterialIcons } from '@expo/vector-icons';

interface ErrorScreenProps {
    message?: string;
    onRetry?: () => void;
    showRetryButton?: boolean;
}

export function ErrorScreen({ 
    message = "Ha ocurrido un error", 
    onRetry,
    showRetryButton = true
}: ErrorScreenProps) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="error-outline" size={64} color={Colors.purpura} />
            <TextPressStart2P style={styles.message}>{message}</TextPressStart2P>
            
            {showRetryButton && onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <MaterialIcons name="refresh" size={24} color="#fff" />
                    <TextPressStart2P style={styles.retryText}>Reintentar</TextPressStart2P>
                </TouchableOpacity>
            )}
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
        textAlign: 'center',
        marginBottom: 30
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.purpura,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8
    },
    retryText: {
        color: '#fff',
        fontSize: 14
    }
}); 