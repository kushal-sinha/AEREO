import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define the context type
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme(); // Detect system theme
    const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme ?? 'light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
