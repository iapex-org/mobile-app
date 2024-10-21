import React, { createContext, useContext, useState } from 'react';
import { Patient } from '../models/Patient';

interface SearchContextType {
    searchResults: Patient[];
    setSearchResults: (results: Patient[]) => void;
    searchError: boolean;
    setSearchError: (error: boolean) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    formData: FormData | null;
    setFormData: (data: FormData | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<Patient[]>([]);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, searchError, setSearchError, isLoading, setIsLoading, formData, setFormData }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
