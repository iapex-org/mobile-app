import React, { createContext, useState, ReactNode } from 'react';

interface ImageContextType {
    images: string[]; // Lista de todas las imágenes
    selectedImages: string[]; // Imágenes seleccionadas
    setImages: React.Dispatch<React.SetStateAction<string[]>>; // Agrega setImages aquí
    setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageContext = createContext<ImageContextType>({
    images: [],
    selectedImages: [],
    setSelectedImages: () => { },
    setImages: () => { },
});

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [images, setImages] = useState<string[]>([]); // Estado para todas las imágenes
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // Estado para imágenes seleccionadas

    return (
        <ImageContext.Provider value={{ images, setImages, selectedImages, setSelectedImages }}>
            {children}
        </ImageContext.Provider>
    );
};
