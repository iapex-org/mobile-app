/**
 * Search Types for IAPEX Patient Search System
 * Supports both existing patient search and ad-hoc searches
 */

export type SearchMode = 'text' | 'image' | 'hybrid';

/**
 * Search request parameters for ad-hoc patient searches
 * All patient fields are optional - at least one should be provided
 */
export interface SearchRequest {
    // Required fields
    search_mode: SearchMode;
    min_similarity_percentage: number;

    // Optional patient data fields
    name?: string;
    lastName?: string;
    secondLastName?: string;
    gender?: string;
    approximateAge?: number;
    skinColor?: string;
    hair?: string;
    complexion?: string;
    eyeColor?: string;
    approximateHeight?: number;
    medicalConditions?: string;
    distinctiveFeatures?: string;
    registrationDateTime?: string;

    // Optional: for existing patient search mode
    source_patient_id?: number | null;

    // Face images for facial recognition search
    face_images?: File[];
}

/**
 * Patient search result with similarity score
 */
export interface SearchResult {
    patient: {
        id: number;
        name?: string;
        lastName?: string;
        secondLastName?: string;
        gender: string;
        approximateAge: number;
        registrationDateTime: string;
        registeringUserId: number;
        active?: boolean;
        skinColor: string;
        hair: string;
        complexion: string;
        eyeColor: string;
        approximateHeight: number;
        medicalConditions?: string;
        distinctiveFeatures?: string;
        institution: any;
        images: any[];
    };
    similarity_percentage: number;
}

/**
 * Search response from backend
 */
export interface SearchResponse {
    results: SearchResult[];
    total_results: number;
    search_mode: SearchMode;
}

/**
 * Validation error for search requests
 */
export class SearchValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SearchValidationError';
    }
}

/**
 * Validates search request before sending to backend
 */
export function validateSearchRequest(request: SearchRequest): void {
    // Validate required fields
    if (!request.search_mode) {
        throw new SearchValidationError('El modo de búsqueda es requerido (texto, imagen o híbrido)');
    }

    if (!['text', 'image', 'hybrid'].includes(request.search_mode)) {
        throw new SearchValidationError('Modo de búsqueda inválido. Use: text, image o hybrid');
    }

    if (request.min_similarity_percentage === undefined || request.min_similarity_percentage === null) {
        throw new SearchValidationError('El porcentaje mínimo de similitud es requerido');
    }

    if (request.min_similarity_percentage < 0 || request.min_similarity_percentage > 100) {
        throw new SearchValidationError('El porcentaje de similitud debe estar entre 0 y 100');
    }

    // For ad-hoc searches (no source_patient_id), validate we have at least some data
    if (!request.source_patient_id) {
        const hasTextData = !!(
            request.name ||
            request.lastName ||
            request.gender ||
            request.skinColor ||
            request.hair ||
            request.complexion ||
            request.eyeColor ||
            request.approximateAge ||
            request.approximateHeight
        );

        const hasFaceImages = request.face_images && request.face_images.length > 0;

        if (request.search_mode === 'text' && !hasTextData) {
            throw new SearchValidationError('Para búsqueda por texto, proporcione al menos un campo de información');
        }

        if (request.search_mode === 'image' && !hasFaceImages) {
            throw new SearchValidationError('Para búsqueda por imagen, proporcione al menos una fotografía');
        }

        if (request.search_mode === 'hybrid' && !hasTextData && !hasFaceImages) {
            throw new SearchValidationError('Para búsqueda híbrida, proporcione información de texto y/o fotografías');
        }
    }

    // Validate face images if provided
    if (request.face_images && request.face_images.length > 0) {
        const maxFileSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        request.face_images.forEach((file, index) => {
            if (!allowedTypes.includes(file.type)) {
                throw new SearchValidationError(
                    `Imagen ${index + 1}: Tipo de archivo no permitido. Use JPG o PNG`
                );
            }

            if (file.size > maxFileSize) {
                throw new SearchValidationError(
                    `Imagen ${index + 1}: El archivo excede el tamaño máximo de 10MB`
                );
            }
        });
    }
}
