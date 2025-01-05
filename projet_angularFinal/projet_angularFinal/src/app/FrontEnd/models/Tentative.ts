export interface Tentative {
    idT: number 
    nb: number 
    note: number | undefined
    user: { id: number | null };
    quiz: { idQ: number  }
  }