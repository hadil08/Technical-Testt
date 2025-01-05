import { User } from "../Authentification/models/User";




export class Offer{
    offerId?:number;
    titre?:string;
    description?:string;
    dateSoumission?:Date;
    statut?:string;
    tuteur?:User;
    imageUrl?:string;
    pdfUrls: string[] = [];
    user: { id: number | null };



    //estValide?:boolean;
   
    // chambre_reservations:Chambre[];
    // etudiant_reservations:Etudiant[];
}