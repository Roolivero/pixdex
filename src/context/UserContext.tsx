import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseAuth } from '@/src/services/supabaseAuth';
import { User } from '@supabase/supabase-js';

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
    
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
    toggleAuth: () => Promise<void>;
    clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Verificar usuario actual al cargar la app
    useEffect(() => {
        checkUser();
        
        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabaseAuth.onAuthStateChange((user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkUser = async () => {
        try {
            const { user, error } = await supabaseAuth.getCurrentUser();
            if (error) {
                console.error("Error verificando usuario:", error);
            } else {
                setUser(user);
            }
        } catch (error) {
            console.error("Error en checkUser:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const { data, error } = await supabaseAuth.signIn(email, password);
            
            if (error) {
                throw error;
            }
            
            if (data.user) {
                setUser(data.user);
            }
            
        } catch (error: any) {
            console.error("Error iniciando sesión:", error);
            setError(error.message || "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string, username: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const { data, error } = await supabaseAuth.signUp(email, password, username);
            
            if (error) {
                throw error;
            }
            
            if (data.user) {
                setUser(data.user);
            }
            
        } catch (error: any) {
            console.error("Error registrando usuario:", error);
            setError(error.message || "Error al registrar usuario");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const { error } = await supabaseAuth.signOut();
            
            if (error) {
                throw error;
            }
            
            setUser(null);
            
        } catch (error: any) {
            console.error("Error cerrando sesión:", error);
            setError(error.message || "Error al cerrar sesión");
        } finally {
            setIsLoading(false);
        }
    };    

    const toggleAuth = async () => {
        if (user) {
            await logout();
        } else {
            // Para toggle, usamos un login demo (puedes cambiarlo)
            await login("demo@example.com", "demo123");
        }
    };

    const clearError = () => {
        setError(null);
    };

    const value: UserContextType = {
        user,
        isLoggedIn: user !== null,
        isLoading,
        error,
        login,
        signUp,
        logout,
        toggleAuth,
        clearError,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
} 