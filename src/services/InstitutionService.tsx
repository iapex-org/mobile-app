import axios from "axios";
import { Institution } from "../models/Institution";

const API_REST_BASE_URL = import.meta.env.VITE_API_REST_BASE_URL;
const API_URL = `${API_REST_BASE_URL}/institutions`;

class InstitutionService {
  async getAllInstitutions(): Promise<Institution[]> {
    const response = await axios.get<Institution[]>(API_URL);
    return response.data;
  }

  async getInstitutionByName(name: string): Promise<Institution | null> {
    const response = await axios.get<Institution>(
      `${API_URL}/name/${name}/active`
    );
    return response.data;
  }

  async getInstitutionById(id: number): Promise<Institution | null> {
    const response = await axios.get<Institution>(`${API_URL}/${id}`);
    return response.data;
  }
}

export default new InstitutionService();
