import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

// Define la interfaz para el contexto de accesibilidad
interface AccessibilityContextType {
    isBold: boolean;
    textSize: number;
    isTextToSpeechEnabled: boolean;
    readingSpeed: number;
    isHighContrast: boolean;
    setIsBold: (value: boolean) => void;
    setTextSize: (value: number) => void;
    setIsTextToSpeechEnabled: (value: boolean) => void;
    setReadingSpeed: (value: number) => void;
    setIsHighContrast: (value: boolean) => void;
    handleReadText: (text: string) => Promise<void>;
}

// Define el contexto
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
    children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
    const [isBold, setIsBold] = useState(() => {
        const saved = localStorage.getItem('isBold');
        return saved === 'true';
    });
    const [textSize, setTextSize] = useState(() => {
        const savedSize = localStorage.getItem('textSize');
        return savedSize ? parseInt(savedSize, 10) : 1; // Valor por defecto
    });
    const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(() => {
        const savedTTS = localStorage.getItem('textToSpeechEnabled');
        return savedTTS === 'true'; // Convertimos a booleano
    });
    const [readingSpeed, setReadingSpeed] = useState(() => {
        const savedSpeed = localStorage.getItem('readingSpeed');
        return savedSpeed ? parseInt(savedSpeed, 10) : 1; // Valor por defecto
    });
    const [isHighContrast, setIsHighContrast] = useState(() => {
        const savedContrast = localStorage.getItem('isHighContrast');
        return savedContrast === 'true';
    });

    // Efecto para actualizar variables CSS
    useEffect(() => {
        document.documentElement.style.setProperty('--text-font-weight', isBold ? 'bold' : 'normal');
        document.documentElement.style.setProperty('--text-font-size', `${1 + textSize * 0.25}rem`);
        document.documentElement.style.setProperty('--background-color', isHighContrast ? '#343A40' : '#F4F4F4');
        document.documentElement.style.setProperty('--text-color', isHighContrast ? '#F4F4F4' : '#343A40');
    }, [isBold, textSize, isHighContrast, isTextToSpeechEnabled, readingSpeed]);

    const handleReadText = async (text: string) => {
        if (isTextToSpeechEnabled) {
            try {
                await TextToSpeech.speak({
                    text,
                    lang: 'es-MX', // Español de México
                    rate: 1 + readingSpeed, // Velocidad
                    pitch: 1.0, // Tono
                });
            } catch (error) {
                // console.error('Error al leer texto:', error);
            }
        }
    };

    return (
        <AccessibilityContext.Provider value={{
            isBold,
            textSize,
            isTextToSpeechEnabled,
            readingSpeed,
            isHighContrast,
            setIsBold,
            setTextSize,
            setIsTextToSpeechEnabled,
            setReadingSpeed,
            setIsHighContrast,
            handleReadText,
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

// Hook para usar el contexto
export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};