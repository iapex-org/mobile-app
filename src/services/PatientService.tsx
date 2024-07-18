// services/PatientService.ts

import axios from 'axios';
import { Patient } from '../models/Patient';

const API_URL = 'http://localhost:8080/api/v1/patients';

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
        const response = await axios.get<Patient[]>(`${API_URL}/current-user/institution`);
        return response.data;
    }
}

export default new PatientService();
export type { Patient };
