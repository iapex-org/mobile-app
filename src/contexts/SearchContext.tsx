import React, { createContext, useContext, useState } from 'react';
import { Patient } from '../models/Patient';

interface SearchContextType {
    searchResults: Patient[] | null;
    setSearchResults: (results: Patient[] | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<Patient[] | null>(null);
    
    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
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
