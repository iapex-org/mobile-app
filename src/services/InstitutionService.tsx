import axios from 'axios';
import { Institution } from '../models/Institution';

const API_URL = 'http://localhost:8080/api/v1/institutions';

class InstitutionService {

    async getAllInstitutions(): Promise<Institution[]> {
        const response = await axios.get<Institution[]>(API_URL);
        return response.data;
    }

    async getInstitutionByName(name: string): Promise<Institution | null> {
        const response = await axios.get<Institution>(`${API_URL}/name/${name}/active`);
        return response.data;
    }

    async getInstitutionById(id: number): Promise<Institution | null> {
        const response = await axios.get<Institution>(`${API_URL}/${id}`);
        return response.data;
    }
}

export default new InstitutionService();
