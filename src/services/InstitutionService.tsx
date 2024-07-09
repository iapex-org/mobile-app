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
        },
        {
            id: 2,
            name: 'Hospital General de Zona 10',
            address: 'Xalapa, Veracruz, México',
            phone: '098-765-4321',
            description: 'Ubicación: El Hospital General de Zona 10 se encuentra en la zona centro de Xalapa...',
            imageUrl: 'src/assets/img/institution-1.jpg'
        },
        {
            id: 3,
            name: 'Hospital Regional de Río Blanco',
            address: 'Río Blanco, Veracruz, México',
            phone: '456-789-0123',
            description: 'Ubicación: El Hospital Regional de Río Blanco se encuentra en la zona norte de la ciudad...',
            imageUrl: 'src/assets/img/institution-1.jpg'
        }
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

    async getInstitutionById(institutionId: number): Promise<Institution | undefined> {
        return this.institutions.find(institution => institution.id === institutionId);
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
