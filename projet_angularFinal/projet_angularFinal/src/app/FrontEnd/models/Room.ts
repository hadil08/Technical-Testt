import {Poste} from "./Poste";

export interface Room {
  roomId: number;
  name: string;
  description: string;
  createdDate: Date;
  capacity : number ;
  posts: Poste[];
  imageUrl:string

}
