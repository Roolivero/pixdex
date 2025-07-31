import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { useUser } from '@/src/context/UserContext';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export function LoginModal({ visible, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signUp, clearError, error } = useUser();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !username)) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password, username);
      }
      
      if (!error) {
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setIsLogin(true);
  };

  const handleClose = () => {
    resetForm();
    clearError();
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
            <TextPressStart2P style={styles.title}>
              {isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
            </TextPressStart2P>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <TextPressStart2P style={styles.closeText}>X</TextPressStart2P>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="usuario..."
                value={username}
                onChangeText={setUsername}
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="email..."
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.input}
              placeholder="contraseña..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <TextPressStart2P style={styles.submitText}>
                {isLoading ? 'CARGANDO...' : (isLogin ? 'INGRESAR' : 'CREAR CUENTA')}
              </TextPressStart2P>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? '¿No tienes cuenta? CREAR CUENTA' : '¿Ya tienes cuenta? INICIAR SESIÓN'}
              </Text>
            </TouchableOpacity>
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
    maxWidth: 400,
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
    gap: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    backgroundColor: Colors.fondo,
    color: '#fff',
    padding: 12,
    fontSize: 14,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: Colors.purpura,
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  switchText: {
    color: Colors.verde,
    fontSize: 14,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
