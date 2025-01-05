export interface Tentative {
    idT: number 
    nb: number 
    note: number | undefined
    User: { id: number | null };
    quiz: { idQ: number  }
  }