import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useSearchContext } from '../contexts/SearchContext';
import PatientService from '../services/PatientService';

export const useSearchResults = () => {
    const { searchResults, setSearchResults, setSearchError, setIsLoading, setFormData } = useSearchContext();
    const history = useHistory();

    const searchPatients = useCallback(async (formData: FormData) => {
        try {
            setSearchResults([]);
            setIsLoading(true);
            setSearchError(false);

            const results = await PatientService.searchPatients(formData);
            setSearchResults(results);

            history.replace('/search-results');
        } catch (error: any) {
            console.error('Error en la búsqueda:', error.message);
            setSearchError(true);
        } finally {
            setIsLoading(false);
        }
    }, [setSearchResults, setSearchError, setIsLoading, history]);

    return { searchPatients };
};
