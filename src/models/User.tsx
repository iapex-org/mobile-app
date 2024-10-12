import { Institution } from "./Institution"

export interface User {
    name: string;
    lastName: string;
    secondLastName?: string;
    email: string;
    password: string;
    institution: Institution;
    position: string;
    accountVerified?: boolean;
}