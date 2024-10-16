import axios from 'axios';
import { Patient } from '../models/Patient';

const API_URL = 'http://localhost:8080/api/v1/patients';
const SEARCH_API_URL = 'http://localhost:8000/kmp/search';

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

    async searchPatients(formData: FormData): Promise<Patient[]> {
        const response = await axios.post<Patient[]>(SEARCH_API_URL, formData);
        return response.data;
    }
}

export default new PatientService();
