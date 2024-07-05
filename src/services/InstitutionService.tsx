import { Institution } from '../models/Institution';
import PatientService from './PatientService';

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
        const institutionsWithPatients = await Promise.all(
            this.institutions.map(async (institution) => {
                const patients = await PatientService.getPatientsByInstitution(institution.id);
                return { ...institution, patients };
            })
        );
        return institutionsWithPatients;
    }

    async createInstitution(institution: Institution): Promise<Institution> {
        const newInstitution: Institution = { ...institution, id: this.institutions.length + 1 };
        this.institutions.push(newInstitution);
        return newInstitution;
    }

    async deleteInstitution(institutionId: number): Promise<void> {
        this.institutions = this.institutions.filter(institution => institution.id !== institutionId);
        // Además, eliminar o actualizar pacientes que estaban en esta institución si es necesario
    }
}

export default new InstitutionService();
