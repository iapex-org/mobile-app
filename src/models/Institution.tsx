import { Patient } from './Patient';

export interface Institution {
    id: number;
    name: string;
    type: string;
    direction: Direction;
    openingHours: string;
    emails?: string;
    phoneNumbers?: string;
    registrationDateTime: Date;
    image: string;
    imageUrl: string;
    verificationKey?: string;
    membership: Membership;
    patients: Patient[];
    active?: boolean;
}

export interface Direction {
    id: number;
    state: string;
    city: string;
    postalCode: string;
    neighborhood: string;
    street: string;
    number: string;
}

export interface Membership {
    startDate: Date;
    endDate: Date;
    status: boolean;
}
