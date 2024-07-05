// services/InstitutionService.ts
import { Institution } from '../models/Institution';

class InstitutionService {
    private institutions: Institution[] = [
        {
            id: 1,
            name: 'Hospital IMSS Región Córdoba',
            address: 'Córdoba, Veracruz, México',
            phone: '123-456-7890',
            description: 'Ubicación: El IMSS en Córdoba está situado en una zona accesible de la ciudad...',
            imageUrl: 'src/assets/img/institution-1.jpg'
        }
        // Puedes agregar más instituciones aquí
    ];

    async getInstitutions(): Promise<Institution[]> {
        return this.institutions;
    }

    async createInstitution(institution: Institution): Promise<Institution> {
        const newInstitution: Institution = { ...institution, id: this.institutions.length + 1 };
        this.institutions.push(newInstitution);
        return newInstitution;
    }

    async deleteInstitution(institutionId: number): Promise<void> {
        this.institutions = this.institutions.filter(institution => institution.id !== institutionId);
    }
}

export default new InstitutionService();
