import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
    
    login: () => Promise<void>;
    logout: () => Promise<void>;
    toggleAuth: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
        console.log("Iniciando sesión...");
        
        // Usuario hardcodeado
        const hardcodedUser: User = {
            id: "demo-user-123",
            name: "Jugador Demo",
            email: "demo@example.com"
        };
        
        setUser(hardcodedUser);
        console.log("Sesión iniciada exitosamente:", hardcodedUser.name);
        
        } catch (error) {
        console.error("Error iniciando sesión:", error);
        setError("Error al iniciar sesión");
        } finally {
        setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
        console.log("Cerrando sesión...");
        
        setUser(null);
        console.log("Sesión cerrada exitosamente");
        
        } catch (error) {
        console.error("Error cerrando sesión:", error);
        setError("Error al cerrar sesión");
        } finally {
        setIsLoading(false);
        }
    };    

    const toggleAuth = async () => {
        if (user) {
        await logout();
        } else {
        await login();
        }
    };

    const value: UserContextType = {
        user,
        isLoggedIn: user !== null,
        isLoading,
        error,
        login,
        logout,
        toggleAuth,
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