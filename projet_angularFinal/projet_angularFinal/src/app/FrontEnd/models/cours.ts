import { User } from "../Authentification/models/User";

export interface Cours {
  idC: number;
  title: string;
  path: string | null;
   averageRating:number ;
   totalRatings: number ; 
  user: { id: number | null };
}
