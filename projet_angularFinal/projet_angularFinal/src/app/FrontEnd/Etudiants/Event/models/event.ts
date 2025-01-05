import { User } from "./user";
export interface Evenement {
    numEvent: number;
    nom: string;
    description: string;
    date: Date;
    nombreDePlace: number;
    photoUrl: string; 
    link:string;
    user: User;
}