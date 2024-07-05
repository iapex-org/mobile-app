import { Patient } from '../models/Patient';

class PatientService {
    private patients: Patient[] = [
        { id: 1, age: 34, weight: 80, height: 1.75, body: 'Robusto', description: 'Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...', institutionId: 1 },
        { id: 2, age: 42, weight: 62, height: 1.57, body: 'Sobrepeso', description: 'Piel morena y cabello negro corto y ondulado. Rostro ancho con pómulos hinchados. Labios muy carnosos, con cortaduras en ellos, cejas ligeramente gruesas y ojos en forma de almendra, de un color...', institutionId: 1 },
        { id: 3, age: 20, weight: 72, height: 1.83, body: 'Atlético', description: 'Piel morena clara y el cabello negro, corto y con orientación hacia la izquierda. Tiene una mandíbula definida, complexión delgada pero atlética. Tiene heridas en la zona de la frente y el ojo...', institutionId: 1 }
    ];

    async getPatients(): Promise<Patient[]> {
        return this.patients;
    }

    async getPatientsByInstitution(institutionId: number): Promise<Patient[]> {
        return this.patients.filter(patient => patient.institutionId === institutionId);
    }

    async createPatient(patient: Patient): Promise<Patient> {
        const newPatient: Patient = { ...patient, id: this.patients.length + 1 };
        this.patients.push(newPatient);
        return newPatient;
    }

    async deletePatient(patientId: number): Promise<void> {
        this.patients = this.patients.filter(patient => patient.id !== patientId);
    }
}

export default new PatientService();
