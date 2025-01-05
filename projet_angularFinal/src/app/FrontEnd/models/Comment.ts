import {Poste} from "./Poste";

export interface Comment{
  commentId: number;
  text: string;
  createdDate: Date;
  poste: Poste;
  // user: User;
}
