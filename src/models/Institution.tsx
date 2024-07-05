import { Patient } from "./Patient";

export interface Institution {
    id: number;
    name: string;
    address: string;
    phone: string;
    description: string;
    imageUrl: string;
    patients?: Patient[];
}