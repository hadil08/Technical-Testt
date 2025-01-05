import { Question } from "./Question";


export interface Quiz {
    idQ: number;
    title: string;
    cours: { idC: number | null }// Assurez-vous d'importer la classe Cours si elle existe
    questions: Question[]
    moyenneScores: number | null; 
     // Assurez-vous d'importer la classe Question si elle existe
     // Assurez-vous d'importer la classe Tentative si elle existe
  }
  