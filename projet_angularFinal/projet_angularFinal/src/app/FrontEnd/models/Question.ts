
export interface Question {
    idques: number;
    question: string;
    rep1: string;
    rep2: string;
    rep3: string;
    repCorrect: string;
    quiz: { idQ: number| null };// Assurez-vous d'importer la classe Quiz si elle existe
  }
  