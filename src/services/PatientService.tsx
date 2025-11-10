import axios from "axios";
import { Patient } from "../models/Patient";
import {
  SearchRequest,
  SearchMode,
  validateSearchRequest,
  SearchValidationError,
} from "../models/SearchTypes";

const API_REST_BASE_URL = import.meta.env.VITE_API_REST_BASE_URL;
const API_SEARCH_BASE_URL = import.meta.env.VITE_API_SEARCH_BASE_URL;

const API_URL = `${API_REST_BASE_URL}/patients`;
const SEARCH_API_URL = `${API_SEARCH_BASE_URL}/search`;

class PatientService {
  async getAllPatients(): Promise<Patient[]> {
    const response = await axios.get<Patient[]>(API_URL);
    return response.data;
  }

  async getPatientById(id: number): Promise<Patient | null> {
    const response = await axios.get<Patient>(`${API_URL}/${id}`);
    return response.data;
  }

  async getPatientsByInstitution(): Promise<Patient[]> {
    const response = await axios.get<Patient[]>(`${API_URL}/me/institution`);
    return response.data;
  }

  /**
   * Search for patients using ad-hoc data or existing patient ID
   * @param formData - FormData containing search parameters
   * @param searchMode - Search mode: always 'hybrid' (hardcoded)
   * @param minSimilarity - Minimum similarity percentage: always 50% (hardcoded)
   * @returns Array of matching patients with similarity scores
   */
  async searchPatients(
    formData: FormData,
    searchMode: SearchMode = "hybrid",
    minSimilarity: number = 50
  ): Promise<Patient[]> {
    try {
      // Create a new FormData to ensure proper structure
      const searchFormData = new FormData();

      // Add required search parameters
      searchFormData.append("search_mode", searchMode);
      searchFormData.append(
        "min_similarity_percentage",
        minSimilarity.toString()
      );

      // Extract and append patient data fields (excluding source_patient_id for ad-hoc search)
      const textFields = [
        "name",
        "lastName",
        "secondLastName",
        "gender",
        "approximateAge",
        "skinColor",
        "hair",
        "complexion",
        "eyeColor",
        "approximateHeight",
        "medicalConditions",
        "distinctiveFeatures",
        "registrationDateTime",
      ];

      // Copy text fields from original formData
      textFields.forEach((field) => {
        const value = formData.get(field);
        if (value !== null && value !== undefined && value !== "") {
          searchFormData.append(field, value);
        }
      });

      // Handle face images - append all files with 'face_images' key
      const faceImages = formData.getAll("face_images");
      if (faceImages && faceImages.length > 0) {
        faceImages.forEach((file) => {
          if (file instanceof File) {
            searchFormData.append("face_images", file);
          }
        });
      }

      // Validate before sending
      const requestData: SearchRequest = {
        search_mode: searchMode,
        min_similarity_percentage: minSimilarity,
        // Add other fields for validation
        name: formData.get("name")?.toString(),
        lastName: formData.get("lastName")?.toString(),
        gender: formData.get("gender")?.toString(),
        face_images: faceImages.filter((f) => f instanceof File) as File[],
      };

      validateSearchRequest(requestData);

      // Log request for debugging
      console.log("🔍 Sending ad-hoc search request:");
      console.log("- Search mode:", searchMode);
      console.log("- Min similarity:", minSimilarity);
      console.log("- Face images:", faceImages.length);

      // Display form data content
      for (const pair of searchFormData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`- ${pair[0]}:`, pair[1].name, `(${pair[1].size} bytes)`);
        } else {
          console.log(`- ${pair[0]}:`, pair[1]);
        }
      }

      // Send request to backend
      const response = await axios.post<Patient[]>(
        SEARCH_API_URL,
        searchFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Add timeout to prevent hanging requests
          timeout: 60000, // 60 seconds
        }
      );

      console.log(
        "✅ Search completed:",
        response.data.length,
        "results found"
      );
      return response.data;
    } catch (error) {
      if (error instanceof SearchValidationError) {
        console.error("❌ Validation error:", error.message);
        throw error;
      }

      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Search request failed:",
          error.response?.data || error.message
        );

        if (error.code === "ECONNABORTED") {
          throw new Error(
            "La búsqueda tardó demasiado tiempo. Por favor, intente nuevamente."
          );
        }

        if (error.response?.status === 400) {
          throw new Error(
            error.response.data?.detail || "Datos de búsqueda inválidos"
          );
        }

        if (error.response?.status === 500) {
          throw new Error(
            "Error en el servidor. Por favor, contacte al administrador."
          );
        }

        throw new Error(
          "Error al realizar la búsqueda. Verifique su conexión."
        );
      }

      throw error;
    }
  }
}

export default new PatientService();
