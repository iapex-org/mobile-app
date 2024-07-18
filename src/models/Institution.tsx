// models/Institution.ts

import { Patient } from './Patient';

export interface Institution {
    id: number;
    name: string;
    openingHours: string;
    mapUrl: string;
    emails: string;
    image: string;
    imageUrl: string;
    type: string;
    phoneNumbers: string;
    websites: string;
    verificationKey: string;
    registrationDateTime: Date;
    direction: Direction;
    membership: Membership;
    patients: Patient[];
    active: boolean;
}

export interface Direction {
    id: number;
    // otras propiedades relevantes para la dirección
}

export interface Membership {
    id: number;
    // otras propiedades relevantes para la membresía
}
